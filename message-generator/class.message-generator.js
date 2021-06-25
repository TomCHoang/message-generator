MessageGenerator = new function()
{
	this.vars = {
		defaultPrompt: 'Good {{startTimestamp}} {{firstName}}, and welcome to {{company}}! Room {{roomNumber}} is now ready you. Enjoy your stay, and let us know if you need anything.',
		defaultPromptBtn: "This will clear your input table. Do you want to continue?",
		defaultResetBtn: "This will clear your input table. Do you want to continue?",
		defaultUploadNewBtn: "This will clear your input table. Do you want to continue?",
		defaultUploadExistingBtn: "This will overwrite your input table if column header exists. Do you want to continue?",
		prompt: '',
		promptReg: '{{.*?}}',
		inputHeaders: [
			"startTimestamp",
			"firstName",
			"company",
			"roomNumber"
		]
	};

    this.init = function() {
        MessageGenerator.loadPrompt();
        MessageGenerator.loadInputTable();
        MessageGenerator.loadInputForm();
        MessageGenerator.loadResults();
        MessageGenerator.clearInputTable();
        MessageGenerator.resetHeadersInputTable();
        MessageGenerator.addRowInputTable();
    };

    /* 
     * Click events
     *
     */
    $("body").on("click", "#addrow", function () {
    	MessageGenerator.addRowInputTable();
    });

    $("body").on("click", "#input-table .ibtnDel", function (event) {
    	MessageGenerator.deleteRowInputTable($(this));
    });

    $("body").on("click", "#input-reset-table-btn", function (event) {
    	event.preventDefault();
    	var r = confirm(MessageGenerator.vars.defaultResetBtn);
		if (r == true) {
			MessageGenerator.resetInputTable();
		}
    });

    $("body").on("click", "#prompt-detect-btn", function (event) {
    	event.preventDefault();
    	var r = confirm(MessageGenerator.vars.defaultPromptBtn);
		if (r == true) {
			MessageGenerator.detectInputTable();
		}
    });

    $("body").on("click", "#input-upload-new-btn", function (event) {
    	event.preventDefault();
    	var r = confirm(MessageGenerator.vars.defaultUploadNewBtn);
		if (r == true) {
			MessageGenerator.uploadFileNewInputTable();
		}
    });

    $("body").on("click", "#input-upload-existing-btn", function (event) {
    	event.preventDefault();
    	var r = confirm(MessageGenerator.vars.defaultUploadExistingBtn);
		if (r == true) {
			MessageGenerator.uploadFileExistingInputTable();
		}
    });

    $("body").on("click", "#run-message-generator", function (event) {
    	event.preventDefault();
		MessageGenerator.runMessageGenerator();
    });

    /* 
     * Injecting HTML functions
     *
     */
    this.loadPrompt = function() {
    	MessageGenerator.vars.prompt = MessageGenerator.vars.defaultPrompt;
		jQuery('.message-generator-prompt').html(
			'<textarea id="prompt">'+MessageGenerator.vars.defaultPrompt+'</textarea>'+
            '<p></p>'+
            '<p>'+
                '<a href="#" id="prompt-detect-btn" class="btn btn-primary">Detect Inputs</a>'+
            '</p>'
        );
    };

    this.loadInputTable = function() {
        let heads = "";
        for(let i = 0; i < MessageGenerator.vars.inputHeaders.length; i++) {
        	heads += '<th scope="col">'+MessageGenerator.vars.inputHeaders[i]+'</th>';
        }

		jQuery('.message-generator-input-table').html(
            '<table id="input-table" class="table relative">'+
                '<thead>'+
                '</thead>'+
                '<tbody>'+
                '</tbody>'+
                '<tfoot>'+
                    '<tr>'+
                        '<td colspan="'+(MessageGenerator.vars.inputHeaders.length + 1)+'" style="text-align: left;">'+
                            '<input type="button" class="btn btn-lg btn-block btn-secondary" id="addrow" value="Add Row" />'+
                        '</td>'+
                    '</tr>'+
                '</tfoot>'+
            '</table>'+
            '<div class="table-loading-overlay position-absolute justify-content-center align-items-center">'+
	            '<div class="spinner-border text-primary" role="status">'+
			  		'<span class="sr-only">Loading...</span>'+
				'</div>'+
			'</div>'
		);
    };

    this.loadInputForm = function() { 
		jQuery('.message-generator-input-form').html(
			'<div class="form-group py-2">'+
                '<label for="exampleFormControlFile1" class="h5">Upload Input File</label>'+
                '<input id="input-upload-file" type="file" class="form-control-file" id="exampleFormControlFile1" accept=".json" />'+
                '<div id="change-upload-error-message" class="collapse alert alert-danger my-3" role="alert"></div>'+
            '</div>'+
            '<div class="form-group">'+
                '<button id="input-upload-new-btn" type="submit" class="btn btn-primary mr-4">Upload to New Table</button>'+
                '<button id="input-upload-existing-btn" type="submit" class="btn btn-primary">Upload to Existing Table</button>'+
            '</div>'
        );
    };

    this.loadResults = function() { 
		jQuery('.message-generator-results').html(
            '<a href="#" id="run-message-generator" class="btn btn-primary">Run Message Generator</a>'+
            '<div class="error-message"></div>'+
            '<div id="message-generator-results"></div>'
        );
    };

    /* 
     * Detect Inputs button
     * Retrieves the prompt, grab all {{...}} and place in inputHeaders variable
     */
    this.detectInputTable = function() {
		let promptText = jQuery('#prompt').val();
		MessageGenerator.vars.prompt = promptText;
		let regexp  = new RegExp(MessageGenerator.vars.promptReg, 'g');
		let headers = [...promptText.matchAll(regexp)];
		MessageGenerator.vars.inputHeaders = [];

		for(let i = 0; i < headers.length; i++) {
			let strippedHeader = headers[i][0].replace('{{', '').replace('}}', '');
			MessageGenerator.vars.inputHeaders.push(strippedHeader);
		}

        MessageGenerator.clearInputTable();
        MessageGenerator.resetHeadersInputTable();
        MessageGenerator.addRowInputTable();
    };

    /* 
     * Results functions
     * Goes through each row of the table, replaces values, sends resulting prompt into a textbox
     */
    this.runMessageGenerator = function() {
		let promptText     = MessageGenerator.vars.prompt;
        let swappedHeaders = MessageGenerator.swapObjectKeyValue(MessageGenerator.vars.inputHeaders);
		jQuery('#message-generator-results').html("");

		jQuery('#input-table tbody tr').each(function(){
			let retText = promptText;
			let row     = jQuery(this).find('td');
			let data    = "";
			jQuery.each(swappedHeaders, function(header, col){
				let value = jQuery(row[parseInt(col)]).find('input').val();

				if(header.includes('Timestamp') || header.includes('timestamp')) {
					//https://stackoverflow.com/questions/4611754/javascript-convert-seconds-to-a-date-object
					let t = new Date(1970, 0, 1); // Epoch
					t.setSeconds(value);

					data += '{{'+
								value+': '+
								t.getDate()+
								"/"+(t.getMonth()+1)+
								"/"+t.getFullYear()+
								" "+t.getHours()+
								":"+t.getMinutes()+
								":"+t.getSeconds()+
							'}} ';

					if(t.getHours() < 11) { //12AM to 10:59:59AM is morning
						value = 'morning';
					} else if(t.getHours() < 18) { //11AM to 5:59:59PM is afternoon
						value = 'afternoon';
					} else { //6PM to 11:59:59PM is evening
						value = 'evening';
					}
				} else {
					data += '{{'+value+'}} ';
				}

				retText = retText.replace('{{'+header+'}}', value);
			});
			jQuery('#message-generator-results').append(
				'<div class="result-row py-2">'+
					'<div>'+data+'</div>'+
					'<textarea>'+retText+'</textarea>'+
				'</div>'
			);
		});


		let regexp  = new RegExp(MessageGenerator.vars.promptReg, 'g');
		let headers = [...promptText.matchAll(regexp)];
		MessageGenerator.vars.inputHeaders = [];

		for(let i = 0; i < headers.length; i++) {
			let strippedHeader = headers[i][0].replace('{{', '').replace('}}', '');
			MessageGenerator.vars.inputHeaders.push(strippedHeader);
		}

		MessageGenerator.resetHeadersInputTable();
    };

    /* 
     * Upload to New Table button
     * Check if file exists and is valid. Clears table. Traverse through each json object, formats it, adds to table for columns that exist.
     */
    this.uploadFileNewInputTable = function() {
		var input, file, fr;

		if (typeof window.FileReader !== 'function') {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "The file API isn't supported on this browser yet.", false);
			return false;
		}

		input = document.getElementById('input-upload-file');
		if (!input) {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "Um, couldn't find the fileinput element.", false);
			return false;
		} else if (!input.files) {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "This browser doesn't seem to support the `files` property of file inputs.", false);
			return false;
		} else if (!input.files[0]) {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "Please select a file before clicking 'Load'", false);
			return false;
		} else {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "", true);
			file = input.files[0];
			fr   = new FileReader();
			fr.onload = function(event) {
				let fileResults = JSON.parse(fr.result);

			    MessageGenerator.clearInputTable();

				jQuery.each(fileResults, function(i, row) {
					let rowInputs = {};
			    	rowInputs     = MessageGenerator.recursiveGrabJsonObject(rowInputs, row, "");
			    	MessageGenerator.insertIntoInputTable(rowInputs);
				});
			};
			fr.readAsText(file);
		}
    };

    /* 
     * Helper function: insertIntoInputTable
     * Adds data to table
     */
    this.insertIntoInputTable = function(rowInputs) {
        let rowNum         = MessageGenerator.addRowInputTable();
        let swappedHeaders = MessageGenerator.swapObjectKeyValue(MessageGenerator.vars.inputHeaders);

		jQuery.each(rowInputs, function(header, value) {
			if(typeof swappedHeaders[header] != 'undefined') {
				jQuery('#input-table tbody tr:nth-of-type('+rowNum+') td:nth-of-type('+(parseInt(swappedHeaders[header])+1)+') input').val(value);
			}
		});
    };

    /* 
     * Upload to Existing Table button
     * Check if file exists and is valid. Does not clears table. Traverse through each json object, formats it, update row based on the id.
     * id of 1 will be the first row, id of 2 will be the second row, etc.
     */
    this.uploadFileExistingInputTable = function() {
		var input, file, fr;

		if (typeof window.FileReader !== 'function') {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "The file API isn't supported on this browser yet.", false);
			return false;
		}

		input = document.getElementById('input-upload-file');
		if (!input) {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "Um, couldn't find the fileinput element.", false);
			return false;
		} else if (!input.files) {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "This browser doesn't seem to support the `files` property of file inputs.", false);
			return false;
		} else if (!input.files[0]) {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "Please select a file before clicking 'Load'", false);
			return false;
		} else {
			MessageGenerator.changeErrorMessage("#change-upload-error-message", "", true);
			file = input.files[0];
			fr   = new FileReader();
			fr.onload = function(event) {
				let fileResults = JSON.parse(fr.result);

				jQuery.each(fileResults, function(i, row) {
					let rowInputs = {};
			    	rowInputs = MessageGenerator.recursiveGrabJsonObject(rowInputs, row, "");
			    	MessageGenerator.replaceRowInputTable(rowInputs);
				});
			};
			fr.readAsText(file);
		}
    };

    /* 
     * Helper function: replaceRowInputTable
     * Updates data to table if column header exists
     */
    this.replaceRowInputTable = function(rowInputs) {
        let rowNum         = MessageGenerator.findIdValue(rowInputs);
        let swappedHeaders = MessageGenerator.swapObjectKeyValue(MessageGenerator.vars.inputHeaders);

        if(rowNum === false) {
        	return;
        }

		jQuery.each(rowInputs, function(header, value) {
			if(typeof swappedHeaders[header] != 'undefined') {
				jQuery('#input-table tbody tr:nth-of-type('+rowNum+') td:nth-of-type('+(parseInt(swappedHeaders[header])+1)+') input').val(value);
			}
		});
    };

    /* 
     * Helper function: recursiveGrabJsonObject
     * Checks if element is an object. If object, calls itself to traverse. If not object, it is a string. Add element/header combination.
     */
    this.recursiveGrabJsonObject = function(rowInputs, obj, curHeader) {
		jQuery.each(obj, function(header, value) {
			//remove false to respect header tree. e.g. reservation:roomNumber
			if(false && curHeader != "") {
				header = curHeader + ":" + header;
			}

			if(jQuery.isPlainObject(value)) {
				rowInputs = MessageGenerator.recursiveGrabJsonObject(rowInputs, value, header);
			} else {
				rowInputs[header] = value;
			}
		});

		return rowInputs;
    };

    /* 
     * Helper function: swapObjectKeyValue
     * Swaps the key and value of an object
     */
    this.swapObjectKeyValue = function(json) {
		var ret = {};
		for(var key in json){
			ret[json[key]] = key;
		}
		return ret;
    };

    /* 
     * Helper function: findIdValue
     * Finds id field of json object
     */
    this.findIdValue = function(rowInputs) {
    	let ret = false;

		jQuery.each(rowInputs, function(header, value) {
			if(header == 'id') {
				ret = value;
			}
		});

		return ret;
    };

    /* 
     * Helper function: changeErrorMessage
     * Updates error message
     */
    this.changeErrorMessage = function(selector, message, hide) {
    	jQuery(selector).html(message);
    	if(hide === false) {
    		jQuery(selector).removeClass('collapse');
    	} else {
    		jQuery(selector).addClass('collapse');
    	}
    };

    /* 
     * Helper function: resetHeadersInputTable
     * Clears header row. Re-add headers.
     */
    this.resetHeadersInputTable = function() {
    	MessageGenerator.showLoadingInputTable();
        let heads = "";
        for(let i = 0; i < MessageGenerator.vars.inputHeaders.length; i++) {
        	heads += '<th scope="col">'+MessageGenerator.vars.inputHeaders[i]+'</th>';
        }
		jQuery('.message-generator-input-table thead').html(
            '<tr>'+
                heads+
                '<th scope="col"><button id="input-reset-table-btn" type="submit" class="btn btn-primary">Reset Table</button></th>'+
            '</tr>'
        );
    	MessageGenerator.hideLoadingInputTable(100);
    };

    /* 
     * Helper function: addRowInputTable
     * Adds row with empty inputs to end of table.
     */
    this.addRowInputTable = function() { 
        let columnCount = $("#input-table thead th").length - 1;
        let newRow      = $("<tr>");
        let cols        = "";

        for(let i = 0; i < columnCount; i++) {
        	cols += '<td><input type="text" class="form-control" /></td>';
        }

        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';

        newRow.append(cols);
        $("#input-table").append(newRow);
        return $("#input-table tbody tr").length;
    };

    /* 
     * Delete button
     * Remove row
     */
    this.deleteRowInputTable = function(el) { 
        el.closest("tr").remove();
    };

    /* 
     * Reset Table button
     * Clears table. Adds one empty row.
     */
    this.resetInputTable = function() {
		MessageGenerator.clearInputTable();
		MessageGenerator.addRowInputTable();
    };

    /* 
     * Helper function: showLoadingInputTable
     * Shows a loading gif over input table.
     */
    this.showLoadingInputTable = function(timeout = 0) {
    	if(timeout > 0) {
    		setTimeout(function(){
    			jQuery('.table-loading-overlay').addClass('show');
    		}, timeout);
    	} else {
    		jQuery('.table-loading-overlay').addClass('show');
    	}
    };

    /* 
     * Helper function: hideLoadingInputTable
     * Hides loading gif over input table.
     */
    this.hideLoadingInputTable = function(timeout = 0) {
    	if(timeout > 0) {
    		setTimeout(function(){
    			jQuery('.table-loading-overlay').removeClass('show');
    		}, timeout);
    	} else {
    		jQuery('.table-loading-overlay').removeClass('show');
    	}
    };

    /* 
     * Helper function: clearInputTable
     * Clears table
     */
    this.clearInputTable = function() {
		jQuery('#input-table tbody').html("");
		jQuery('#input-table tfoot').html(
            '<tr>'+
                '<td colspan="'+(MessageGenerator.vars.inputHeaders.length + 1)+'" style="text-align: left;">'+
                    '<input type="button" class="btn btn-lg btn-block btn-secondary" id="addrow" value="Add Row" />'+
                '</td>'+
            '</tr>'
        );
    };
}

jQuery(function(){MessageGenerator.init()});
