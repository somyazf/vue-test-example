<!-- eslint-disable no-unused-vars -->
<template>
  <div ref="toPdf" id="content">
    <h1>Related Courses For You</h1>
    <div class="courses">
      <div>
        <h2>Course 1</h2>
        <p>course description about course</p>
        <a href="https://rawgit.com/MrRio/jsPDF/master/docs/index.html">click</a>
      </div>
      <div>
        <h2>Course 2</h2>
        <p>course description about course2</p>
      </div>
      <div>
        <h2>Course 3</h2>
        <p>course description about course3</p>
      </div>
    </div>
    <button @click="copyPages">merge WITH pdflib</button>
    <!-- <button @click="generatePdfMake">GENERATE WITH PDFMAKE</button> -->
    <button @click="generateJsPdf">GENERATE WITH JSPDF</button>
  </div>
</template>
<script>
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import IRANSans from "../assets/IRANSans-normal"
import pic1 from "../assets/images/pic1.jpeg"
import pic2 from "../assets/images/pic2.jpeg"
import pic3 from "../assets/images/pic3.jpeg"
// eslint-disable-next-line no-unused-vars
import download from "downloadjs"
// eslint-disable-next-line no-unused-vars
import { ReadingDirection, PDFDocument, rgb, StandardFonts } from "pdf-lib"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs
// import generatedPdf from "../assets/docs/generatedpdf.pdf"
export default {
    methods: {
        async asemble() {
            const flagUrl = 'https://pdf-lib.js.org/assets/american_flag.pdf';
            const flagPdfBytes = await fetch(flagUrl).then((res) => res.arrayBuffer());

                    // Fetch U.S. constitution PDF
            const constitutionUrl = 'https://api.carnotic.com/course/291/60f688b5a27c3.pdf';
            const constitutionPdfBytes = await fetch(constitutionUrl).then((res) =>
                res.arrayBuffer(),
            );

                    // Create a new PDFDocument
            const pdfDoc = await PDFDocument.create();	

                    // Embed the first page of the American flag PDF
            const [americanFlag] = await pdfDoc.embedPdf(flagPdfBytes);

                    // Load the constitution PDF into a PDFDocument
            const usConstitutionPdf = await PDFDocument.load(constitutionPdfBytes);

                    // Embed the second page of the constitution and clip the preamble
            const preamble = await pdfDoc.embedPage(usConstitutionPdf.getPages()[1], {
                left: 55,
                bottom: 485,
                right: 300,
                top: 575,
            });

                    // Get the width/height of the American flag PDF scaled down to 30% of its original size
            const americanFlagDims = americanFlag.scale(0.3);

                    // Get the width/height of the preamble clipping scaled up to 225% of its original size
            const preambleDims = preamble.scale(2.25);

                    // Add a blank page to the document
            const page = pdfDoc.addPage();

                    // Draw the American flag image in the center top of the page
            page.drawPage(americanFlag, {
                ...americanFlagDims,
                x: page.getWidth() / 2 - americanFlagDims.width / 2,
                y: page.getHeight() - americanFlagDims.height - 150,
            });

                    // Draw the preamble clipping in the center bottom of the page
            page.drawPage(preamble, {
                ...preambleDims,
                x: page.getWidth() / 2 - preambleDims.width / 2,
                y: page.getHeight() / 2 - preambleDims.height / 2 - 50,
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save()

                    // Trigger the browser to download the PDF document
            download(pdfBytes, "pdf-lib_pdf_page_embedding_example.pdf", "application/pdf");

        },
        async copyPages() {
            const url1 = 'https://api.carnotic.com/course/291/60f688b5a27c3.pdf'
            const firstDonorPdfBytes = await fetch(url1).then(res => res.arrayBuffer())

            const url2 = 'https://pdf-lib.js.org/assets/us_constitution.pdf'
            const secondDonorPdfBytes = await fetch(url2).then(res => res.arrayBuffer())

            const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes)
            // eslint-disable-next-line no-undef
            const secondDonorPdfDoc = secondDonorPdfBytes

            const pdfDoc = await PDFDocument.create();

            const firstPdfPages = firstDonorPdfDoc.getPages()
            const pdfIndexs = []
            let pdfIndexsLetter = []
            for (const key in firstPdfPages) {
                pdfIndexs.push( Number(key))
                pdfIndexsLetter.push('page' + Number(key))
            }
            const firstDonorPage = await pdfDoc.copyPages(firstDonorPdfDoc, pdfIndexs)
            pdfIndexsLetter = firstDonorPage
            for (let index = 0; index < pdfIndexsLetter.length; index++) {
                pdfDoc.addPage(pdfIndexsLetter[index])
            }

            const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [0])
            pdfDoc.addPage(secondDonorPage)
            const pdfBytes = await pdfDoc.save()
            download(pdfBytes, "pdf-lib_page_copying.pdf", "application/pdf");
        },
        async modifyPdf(firstPdfDoc, pdfDoc) {
            const url2 = 'https://pdf-lib.js.org/assets/us_constitution.pdf'
            const secondPdfBytes = await fetch(url2).then(res => res.arrayBuffer())
            const secondPdfDoc = await PDFDocument.load(secondPdfBytes)
            // const pdfDoc = await PDFDocument.create()
            const [secondPdfCopy] = await pdfDoc.copyPages(secondPdfDoc, [0])
            const pages = firstPdfDoc.getPages()
            const length = pages.length
            const lastPage = pages[length - 1]
            // firstPdfDoc.addPage()
            const pages2 = firstPdfDoc.getPages()
            // Get the width and height of the first page
            // eslint-disable-next-line no-unused-vars
            const { height } = lastPage.getSize()
            // eslint-disable-next-line no-unused-vars
            const lPage = pages2[11]
            pdfDoc.insertPage(0, secondPdfCopy)
            const pdfBytes = await firstPdfDoc.save()
            download(pdfBytes, "pdf-lib_page_mody.pdf", "application/pdf");   
        },
        generateJsPdf() {
            console.log('jd')
            const doc = new jsPDF('l', 'pt', 'A4')
            IRANSans
            doc.setFont('IRANSans')
            doc.setDrawColor(142, 144, 145);
            doc.rect(10, 10, 820, 573);
            doc.setFontSize(20)
            doc.text("دوره های پیشنهادی" , 421 ,58, 'center')
            doc.setFontSize(15)
            doc.addImage(pic1, "JPEG", 30, 90, 240, 140)
            doc.setFontSize(11)
            doc.textWithLink("تحلیل تنش اعضای خرپای سه بعدی در نرم افزار آباکوس",
             30 + 220, 90 + 140 + 20, {
                url: "https://parall.ax/",
                align: 'right',
                maxWidth: 280,
                lineHeightFactor: 2.1
            })
            doc.addImage(pic2, "JPEG", 30 + 240 + 20, 90, 240, 140)
            doc.textWithLink("تحلیل تنش مخازن کامپوزیتی تحت فشار داخلی در نرم افزار آباکوس",
             220 + 30 + 240 + 20, 90 + 140 + 20, {
                url: "https://parall.ax/",
                align: 'right',
                maxWidth: 280,
                lineHeightFactor: 2.1
            })
            doc.addImage(pic3, "JPEG", 30 + 240 + 240 + 40, 90, 240, 140)
            doc.textWithLink("شبیه‌سازی فرآیند اتوفرتاژ و تنش پسماند در ماده سخت‌شونده در نرم افزار آباکوس",
             220 + 30 + 240 + 240 + 40, 90 + 140 + 20, {
                url: "https://parall.ax/",
                align: 'right',
                maxWidth: 280,
                lineHeightFactor: 2.1
            })
            doc.save('generated' + new Date().getTime() + '.pdf')
        },
        generatePdfMake() {
            const docDefinition = {
                content: [
                    {
                        text: 'This is a header',
                        style: 'header'
                    },
                    {
                        text: '- course link',
                        link: 'http://google.com',
                        style: 'text'
                    },
                    {
                        text: '- course 2 link',
                        link: 'http://google.com',
                        style: 'text'
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 30, 0, 40]
                    },
                    text: {
                        alignment: 'right',
                        margin: [0, 10]
                    }
                }
                
            }
            pdfMake.createPdf(docDefinition).open()
        },
        capture() {
            // take picture
            html2canvas(document.querySelector('#content')).then(function(canvas) {
                var imgData = canvas.toDataURL('image/jpeg')
                console.log(imgData)
                var img = new Image()
                img.src = imgData
                img.onload = function () {
                    var doc=''
                    if (this.width > this.height) {
                        doc = new jsPDF('l', 'px', [this.width, this.height], 5, 3)
                        console.log('1', this.width, this.height * 0.5)
                    } else {
                        doc = new jsPDF('p', 'mm', [this.width * 0.5, this.height * 0.5])
                        console.log('2')
                    }
                    doc.addImage(imgData, 'jpeg', 0, 0, this.width * 0.175, this.height * 0.175)
                    doc.save('pdf_' + new Date().getTime() + '.pdf')
                };
            })
        }
    }
}
</script>
<style scoped>
.courses {
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
button {
  width: 200px;
  padding: 15px 0px;
  background: #fab32a;
  border-radius: 20px;
  outline: none;
  color: #fff;
  font-weight: 600;
  border: none;
  margin-top: 30px;
  cursor: pointer;
}
button:nth-of-type(1) {
    margin-right: 20px;
}
</style>
