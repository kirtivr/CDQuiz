
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Input", {
	
	valueHelpRequest: function (evt) {
		input=evt.getSource();
		switch(input.sId){
		case "Input--QuesCat":
			this._a = 10;
			break;
			
		case "Input--QuesSubCat":
			this._b = 10;
			break;
			
		}
		// Handling of both confirm and cancel; clear the filter
		handleClose = function (evt) {
			this._oSelectedItem = evt.getParameter("selectedItem");
			if (this._oSelectedItem) {
				
				input.setValue(this._oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		};
		if (!this._valueHelpSelectDialog) {
			this._valueHelpSelectDialog = new sap.m.SelectDialog({
				title: "{i18n>QuesCat}",
				items: {
					path: "/QuesCatCollection",
					template: new sap.m.StandardListItem({
						title: "{QuesCat}",
						description: "{Description}"
					})
				},
				search: function (evt) {
					this._sValue = evt.getParameter("value");
					this._oFilter = new sap.ui.model.Filter(
						"QuesCat",
						sap.ui.model.FilterOperator.Contains, this._sValue
					);
					evt.getSource().getBinding("items").filter([this._oFilter]);
				},
				confirm: handleClose,
				cancel: handleClose
			});
		}

		// open dialog
		this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel());
		this._valueHelpSelectDialog.open();
	},	
	
	valueHelpRequestQuesSubCat: function (evt) {
		input=evt.getSource();
		
		// Handling of both confirm and cancel; clear the filter
		handleClose = function (evt) {
			this._oSelectedItem = evt.getParameter("selectedItem");
			if (this._oSelectedItem) {
				
				input.setValue(this._oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		};

		// Create a SelectDialog and display it; bind to the same
		// model as for the suggested items
		if (!this._valueHelpSelectDialog) {
			this._valueHelpSelectDialog = new sap.m.SelectDialog({
				title: "{i18n>QuesSubCat}",
				items: {
					path: "/QuesSubCatCollection",
					template: new sap.m.StandardListItem({
						title: "{QuesSubCat}",
						description: "{Description}"
					})
				},
				search: function (evt) {
					this._sValue = evt.getParameter("value");
					this._oFilter = new sap.ui.model.Filter(
						"QuesSubCat",
						sap.ui.model.FilterOperator.Contains, this._sValue
					);
					evt.getSource().getBinding("items").filter([this._oFilter]);
				},
				confirm: handleClose,
				cancel: handleClose
			});
		}

		// open dialog
		this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel());
		this._valueHelpSelectDialog.open();
	},	
	
	handleNavButtonPress : function (evt) {
			tinyMCE.activeEditor.setContent('');
			sap.ui.getCore().byId("QuesCat").setValue('');
			sap.ui.getCore().byId("QuesSubCat").setValue('');
			this._app = sap.ui.getCore().byId("myFiori");
				
			this._app.backToPage("homePage");
	}, 

	cancelButtonPress: function(evt) {
		// show confirmation dialog
		sap.m.MessageBox.show(
				"Do you really want to cancel creation?",
				sap.m.MessageBox.Icon.QUESTION,
				"Confirmation",
				[sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				jQuery.proxy(function(oAction) {
					
					// remove virtual state if dialog not closed by history
					if (oAction) {
						sap.ui.getCore().getEventBus().publish("nav", "back");
					}
					
					if (sap.m.MessageBox.Action.YES === oAction) {
						//clean state
						tinyMCE.activeEditor.setContent('');
						sap.ui.getCore().byId("QuesCat").setValue('');
						sap.ui.getCore().byId("QuesSubCat").setValue('');
						// navigate
						this._app = sap.ui.getCore().byId("myFiori");
						this._app.back("homePage");
					}
				}, this)
			);
		

	},
	
	acceptButtonPress: function(evt) {
		this._content = tinymce.activeEditor.getContent({format: 'raw'});;
		//alert(this._content);
		//alert(this.getModel().getJSON());
		this._allQuestionsLength = this.getModel().getProperty("/QuestionCollection").length;
		//console.log(allQuestionsLength);
		this._QId= this._allQuestionsLength+1;
		this._QId=this._QId+"";
		this._QCat = sap.ui.getCore().byId("QuesCat").getValue()+"";
		this._QScat = sap.ui.getCore().byId("QuesSubCat").getValue()+"";
		this._creator = userID; //global var
		this._d = new Date();
		this._Date = this._d.getFullYear()+"-"+this._d.getMonth()+"-"+this._d.getDate()+"T"+this._d.getHours()+":"+this._d.getMinutes()+":"+this._d.getSeconds();
		this._createdat = this._Date;

		this._questionJSONData =
		{
		 "QuesId":this._QId,
         "QuesCat":this._QCat,
         "QuesSubCat":this._QScat,
         "CreatedBy":this._creator,
         "CreatedAt":this._createdat,
         "AnsCat":"S",
         "QStatus":"N",
         "CircAt":"",
         "QuesText": this._content,
         "ProofPoints":"0",
         "Version":"1",
         "Versions":[
            {
               "QuesId":this._QId,
               "Version":"1",
               "ProofPoints":"10",
               "ChangedBy":this._creator,
               "ChangedAt":this._createdat
            }
         ],
         "Answers":[
            {
               "QuesId":this._QId,
               "AnsId":"1",
               "AnsText":"Test",
               "CorrectAns":"N"
            },
            {
               "QuesId":this._QId,
               "AnsId":"2",
               "AnsText":"Test",
               "CorrectAns":"N"
            },
            {
               "QuesId":this._QId,
               "AnsId":"3",
               "AnsText":"Test",
               "CorrectAns":"N"
            },
            {
               "QuesId":this._QId,
               "AnsId":"4",
               "AnsText":"Test",
               "CorrectAns":"Y"
            },
            {
               "QuesId":this._QId,
               "AnsId":"5",
               "AnsText":"Test",
               "CorrectAns":"N"
            }

            ]
     	};

     	this._allJSONModelQuestionData = JSON.parse(this.getModel().getJSON());
     	this._allJSONModelQuestionData["QuestionCollection"].push(this._questionJSONData);
     	this.getModel().setData(this._allJSONModelQuestionData,false);
     	//update server json file 
     	$.ajax({
			  type: 'POST',
			  url: "http://localhost/model/savejson.php",//url of receiver file on server
			  data: {data:JSON.stringify(this._allJSONModelQuestionData)}, //your data
			  success: function(){alert('file updated hf');}, //callback when ajax request finishes
			});

     	//console.log(this.getModel().getJSON());
		tinyMCE.activeEditor.setContent('');	
		sap.ui.getCore().byId("QuesCat").setValue('');
		sap.ui.getCore().byId("QuesSubCat").setValue('');
		// navigate
		this._app = sap.ui.getCore().byId("myFiori");
		this._app.back("homePage");
	},

	onAfterRendering: function() {
		//sap.ui.getCore().byId("myFiori").getCurrentPage().setShowNavButton(true);
		tinymce.init({
	        selector: "TextArea",
	        doctype:"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' "
	        	+ "'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>",
	        relative_urls: false,
	        plugins: [
	                "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
	                "searchreplace wordcount visualblocks visualchars code fullscreen media nonbreaking",
	                "table contextmenu directionality emoticons template textcolor paste fullpage textcolor jbimages"
	        ],

	        toolbar1: "alignleft aligncenter alignright alignjustify | fontselect fontsizeselect | forecolor | link jbimages |  hr removeformat | subscript superscript | charmap emoticons | spellchecker | template | preview",
	        menubar: false,
	        statusbar: false,
	        paste_data_images: true,
	        toolbar_items_size: 'small',
	        width: "100%",
	        height: "400px",
	        image_advtab: true,
	        templates: [
	                {title: 'Test template 1', content: 'Test 1'},
	                {title: 'Test template 2', content: 'Test 2'}
	        ],
	        
	        

	});

		
   
	},


});