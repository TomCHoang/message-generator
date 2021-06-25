# Live example can be found here: https://tomhoangdesign.com/message-generator/

## How to run the program
1. Go to https://tomhoangdesign.com/message-generator/
2. Download demo files Guests.json and Companies.json
3. If prompt is changed, click "Detect Inputs" button to update the headers in the input table. This will determine what the headers will be.
4. In the Inputs section, choose the Guests.json file and click the "Upload to New Table" button. This will clear the table and populate it. If the header is not found in the json file, it'll be ignored.
5. After Guests.json file uploads, choose the Companines.json file and click the "Upload to Existing Table" button. This will populate and update the existing table. The "id" field will determine which row gets updated. Id of 1 will update the first row, id of 2 will update the second row, id of 3 will update the third row, etc.
6. Uploading the files are optional. The table can be manually entered and altered.
7. Use the "Reset Table" to clear the table. "Delete" will delete the row. "Add Row" will add a row to the bottom.
8. Once the table is ready, click the "Run Message Generator" button in the results section. Any textbox that is empty will be replaced with an empty string.
9. Multiple result sections will appear. Above the textbox will be the row's data. Inside the textbox is the autogenerated prompt with replaced values. Copy the text inside the textbox and paste to your message app.

## Overview of design decisions
* I decided to create a webpage because I wanted an interactive GUI.

## Languages
* Languages used are PHP, Bootstrap, jQuery.
* I already have a hosting website that uses PHP.
* Bootstrap made the look and feel fast and easy.
* jQuery install is ready to use after including the jQuery script tag.

## Verifying correctness
* I used the initial files as the base case. I created more demo files in the demo folder. Download and test these files.

## The list for improvements:
1. Allow user to specify which hours dictate what message is printed for timestamp. It is currently hardcoded to:
   * Morning: 12AM to 10:59:59AM
   * Afternoon: 11AM to 5:59:59PM
   * Evening: 6PM to 11:59:59PM
2. Have button next to each result to copy to clipboard.
3. Ignore empty tables and blank rows
4. Option to restrict json tree. Instead of roomNumber, it would be reservation:roomNumber instead.


