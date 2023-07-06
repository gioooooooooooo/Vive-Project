'use strict';
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib'); 
const { writeFileSync } = require("fs");
const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::pub.pub', ({
    strapi
}) => ({
    async find(ctx) {
        let result = await strapi.entityService.findMany('api::pub.pub', {
            populate: ['picture']
        });
        return result;
    },
    async createPDF(ctx) {
            const pdfDoc = await PDFDocument.create()
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
            const x = 'https://github.com/Pablo-Aldana'

            const page = pdfDoc.addPage()
            const { width, height } = page.getSize()
            const fontSize = 30
            page.drawText('DAJE ROMA', {
              x: 50,
              y: height - 4 * fontSize,
              size: fontSize,
              font: timesRomanFont,
              color: rgb(0, 0.53, 0.71),
            })
            /*page.drawImage(x, {
              x: page.getWidth() / 2 - pngDims.width / 2 + 75,
              y: page.getHeight() / 2 - pngDims.height + 300,
              width: pngDims.width,
              height: pngDims.height,
            })*/
            const pdfBytes = await pdfDoc.save()
            var pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');
            ctx.type = 'pdf';
            ctx.send(pdfBuffer);
        }
}
));