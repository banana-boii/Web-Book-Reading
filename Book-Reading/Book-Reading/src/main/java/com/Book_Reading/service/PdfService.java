package com.Book_Reading.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;


@Service
public class PdfService {

    public int generateCoverAndCountPages(File pdfFile, String outputImagePath) throws IOException {
        
        try (PDDocument document = Loader.loadPDF(pdfFile)) {
            // 1. Get total pages
            int totalPages = document.getNumberOfPages();

            // 2. Render Page 0 as an Image
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 150); 

            // 3. Save the image to your uploads folder
            ImageIO.write(bim, "png", new File(outputImagePath));

            return totalPages;
        }
    }
}
