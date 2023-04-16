import path from "path";
import { readFileSync } from "fs";
import PdfPrinter from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

const __dirname = path.resolve();
var fonts = {
  Roboto: {
    italics: Buffer.from(
      readFileSync(__dirname + "/static/ArialItalic.ttf"),
      "base64"
    ),
  },
  Times: {
    normal: "Times-Roman",
    bold: "Times-Bold",
    italics: "Times-Italic",
    bolditalics: "Times-BoldItalic",
  },
};

const printer = new PdfPrinter({ vfs: pdfFonts.pdfMake.vfs, ...fonts });

function createSynopsis(projects) {
  const docDefinition = {
    permissions: {
      printing: "highResolution", //'lowResolution'
      modifying: false,
      copying: false,
      annotating: true,
      fillingForms: true,
      contentAccessibility: true,
      documentAssembly: true,
    },

    header: function () {
      return [
        {
          columns: [
            {
              text: "Pune Institute of Computer Technology, Pune-43",
              fontSize: 10,
              italics: "true",
              alignment: "left",
            },
            {
              text: "Impetus Synopsis: InC 2023",
              fontSize: 10,
              italics: "true",
              alignment: "right",
            },
          ],
          margin: [50, 20, 50, 0],
        },
        ,
        {
          canvas: [
            {
              type: "line",
              x1: 50,
              y1: 10,
              x2: 595 - 50,
              y2: 10,
              lineWidth: 1,
            },
          ],
        },
      ];
    },
    footer: function (currentPage, pageCount) {
      return [
        {
          canvas: [
            {
              type: "line",
              x1: 50,
              y1: 10,
              x2: 595 - 30,
              y2: 10,
              lineWidth: 1,
            },
          ],
        },
        {
          text: currentPage.toString(),
          fontSize: 10,
          italics: "true",
          alignment: "center",
          margin: [30, 10, 30, 0],
        },
      ];
    },
    content: [
      // toc header
      {
        toc: {
          title: {
            text: "Contents",
            style: "header",
            alignment: "left",
            fontSize: 24,
            fontWeight: "bold",
            margin: [10, 10],
            marginBottom: 40,
          },
          textMargin: [5, 5, 5, 5],
          //textStyle: {italics: true},
          numberStyle: { bold: true },
          numberMargin: [10, 10, 10, 10],
          pagebreak: "after",
        },
      },
      // toc section
      {
        text: "Project Summaries",
        fontSize: 20,
        bold: true,
        margin: [10, 20],
        pageBreak: "before",
        tocItem: true,
        alignment: "center",
        tocStyle: { bold: true, fontSize: 16 },
      },
      // toc sub-sections
      ...projects.map((project) => [
        {
          text: `${project.projectId} : ${project.projectTitle} `,
          fontSize: 14,
          bold: true,
          tocItem: true,
          tocMargin: [20, 0, 0, 0],
          marginBottom: 8,
        },
        //{ text: `Project ID:`, fontSize: 12 },
        {
          columns: [
            {
              text: "Abstract: ",
              fontSize: 12,
              bold: true,
              width: "auto",
              margin: [0, 0, 10, 0],
            },
            {
              text: `${project.projectAbstract}`,
              fontSize: 12,
              width: "auto",
              alignment : "justify"
            },
          ],
        },

        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 595 - 120,
              y2: 5,
              lineWidth: 0.5,
              lineColor: "#aaa",
            },
          ],
          margin: [0, 10, 0, 10],
        }, // horizontal line between projects
      ]),
    ],

    pageMargins: [60, 60],
    defaultStyle: {
      font: "Times",
    },
  };

  return printer.createPdfKitDocument(docDefinition);
}

export default createSynopsis;
