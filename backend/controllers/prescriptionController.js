const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
  // Create a new document and add a new page
  let myFile = fs.readFileSync("./form.pdf")
  console.log(myFile)
  const pdfDoc = await PDFDocument.load(myFile)
  console.log(pdfDoc)

  const form = pdfDoc.getForm()

  // Get all fields in the PDF by their names
  const professionalField = form.getTextField('doctorName')
  const dateField = form.getTextField('date')
  const patientField = form.getTextField('patientName')
  const ageField = form.getTextField('patientAge')
  const diagnosisField = form.getTextField('diagnosis')
  const testsField = form.getTextField('tests')
  const adviceField = form.getTextField('advice')

  // Fill in the basic info fields
  professionalField.setText('Mario')
  dateField.setText('24/11/2021')
  ageField.setText('24 years')
  patientField.setText('Nihal')
  diagnosisField.setText('ded')
  testsField.setText('none')
  adviceField.setText('Paracetamol 2 bela')

  form.flatten();
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = pdfDoc.save()
  //Write the PDF to a file
  fs.writeFileSync('./test2.pdf', await pdfDoc.save());
}

