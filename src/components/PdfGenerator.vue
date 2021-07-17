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
    <button @click="generatePdfMake">GENERATE WITH PDFMAKE</button>
    <button @click="generateJsPdf">GENERATE WITH JSPDF</button>
  </div>
</template>
<script>
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import IRANSans from "../assets/IRANSans-normal"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
    methods: {
        generateJsPdf() {
            const doc = new jsPDF('p', 'pt', 'A4')
            IRANSans
            doc.setFont('IRANSans')
            doc.setFontSize(20)
            doc.text("دوره های مرتبط" , 250 ,60,'left')
            doc.setFontSize(15)
            doc.textWithLink("- دوره فلان چیز", 550, 110, {
                url: "https://parall.ax/",
                align: 'right'
            })
            doc.textWithLink("- دوره فلان چیز", 550, 140, {
                url: "https://parall.ax/",
                align: 'right'
            })
            doc.save('rel' + new Date().getTime() + '.pdf')
            // const elem = document.getElementById('content')
            // doc.html(elem, {
            //     callback: function (doc) {
            //         doc.save('rel' + new Date().getTime() + '.pdf');
            //     },
            //     x: 10,
            //     y: 10
            // })
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
