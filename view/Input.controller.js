
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Input", {
	
	valueHelpRequest: function (evt) {
		var input=evt.getSource();
		switch(input.sId){
		case "Input--QuesCat":
			var a = 10;
			break;
			
		case "Input--QuesSubCat":
			var b = 10;
			break;
			
		}
		// Handling of both confirm and cancel; clear the filter
		handleClose = function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				
				input.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		};

		// Create a SelectDialog and display it; bind to the same
		// model as for the suggested items
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
					var sValue = evt.getParameter("value");
					var oFilter = new sap.ui.model.Filter(
						"QuesCat",
						sap.ui.model.FilterOperator.Contains, sValue
					);
					evt.getSource().getBinding("items").filter([oFilter]);
				},
				confirm: handleClose,
				cancel: handleClose
			});
		}

		// open dialog
		this._valueHelpSelectDialog.setModel(this.getView().getModel());
		this._valueHelpSelectDialog.open();
	},	
	
	valueHelpRequestQuesSubCat: function (evt) {
		var input=evt.getSource();
		
		// Handling of both confirm and cancel; clear the filter
		handleClose = function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				
				input.setValue(oSelectedItem.getTitle());
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
					var sValue = evt.getParameter("value");
					var oFilter = new sap.ui.model.Filter(
						"QuesSubCat",
						sap.ui.model.FilterOperator.Contains, sValue
					);
					evt.getSource().getBinding("items").filter([oFilter]);
				},
				confirm: handleClose,
				cancel: handleClose
			});
		}

		// open dialog
		this._valueHelpSelectDialog.setModel(this.getView().getModel());
		this._valueHelpSelectDialog.open();
	},	
	
	handleNavButtonPress : function (evt) {
			var app = sap.ui.getCore().byId("myFiori");
			app.backToPage("homePage");
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
						
						// navigate
						var app = sap.ui.getCore().byId("myFiori");
						app.back("homePage");
					}
				}, this)
			);
		

	},
	
	acceptButtonPress: function(evt) {
		var content = tinyMCE.activeEditor.getContent();
		alert(content);
		tinyMCE.activeEditor.setContent('');
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

	        toolbar1: "alignleft aligncenter alignright alignjustify | fontselect fontsizeselect | forecolor backcolor | bullist numlist | outdent indent | link image jbimages | table | hr removeformat | subscript superscript | charmap emoticons | spellchecker | template | preview",
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
	        ]
	});

		
   
	},


});