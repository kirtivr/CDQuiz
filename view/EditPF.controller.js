
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.EditPF", {
	onBeforeRendering:function()
	{

		
	},

	valueHelpRequest: function (evt) {
		input=evt.getSource();
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

			sap.ui.getCore().byId("QuesCatEditPF").setValue('');
			sap.ui.getCore().byId("QuesSubCatEditPF").setValue('');
			this._app = sap.ui.getCore().byId("myFiori");
				
			this._app.backToPage("homePage");
	}, 

	clearEditorContent:function()
	{		
			tinyMCE.activeEditor.setContent('');
			sap.ui.getCore().byId("QuesCatEditPF").setValue('');
			sap.ui.getCore().byId("QuesSubCatEditPF").setValue('');
						// navigate
		    sap.ui.getCore().byId("EditQuestionPF").getController().nav.to("DetailPF",sap.ui.getCore().byId("EditQuestionPF").getBindingContext());
	},
	cancelButtonPress: function(evt) {
		// show confirmation dialog
		
		sap.m.MessageBox.show(
				"Do you really want to cancel edit?",
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
						sap.ui.getCore().byId("EditQuestionPF").getController().clearEditorContent();
					}
				}, this)
			);
		

	},
	
	acceptButtonPress: function(evt) {
		this._content = tinymce.get('CreateQuestionTAEditPF').getContent({format: 'raw'});;
		//alert(this._content);
		//alert(this.getModel().getJSON());
		this._JSONModelQuestionData = JSON.parse(sap.ui.getCore().getModel().getJSON());
		//console.log(this.getView().getModel().getJSON());
     	this._QCollection = this._JSONModelQuestionData["QuestionCollection"];
     	this._QNstr=sap.ui.getCore().byId("EditQuestionPF").getBindingContext()+"";
     	this._i=(sap.ui.getCore().byId("EditQuestionPF").getBindingContext()+"").length-1;
		this._temp='';

     	while((this._QNstr).charAt(this._i)!= '/')
     	{
     		this._temp=(this._QNstr).charAt(this._i)+this._temp;
     		this._i=this._i-1;
     	};
     	this._QNumber=parseInt(this._temp);
     	this._EditQuestion = this._JSONModelQuestionData["QuestionCollection"][this._QNumber];

		this._QCat = sap.ui.getCore().byId("QuesCatEditPF").getValue()+"";
		this._QScat = sap.ui.getCore().byId("QuesSubCatEditPF").getValue()+"";
		//changed at
		this._d = new Date();
		this._Date = this._d.getFullYear()+"-"+this._d.getMonth()+"-"+this._d.getDate()+"T"+this._d.getHours()+":"+this._d.getMinutes()+":"+this._d.getSeconds();
		this._createdat = this._Date;

		this._EditQuestion["QuesCat"]=this._QCat;
		this._EditQuestion["QuesSubCat"]=this._QScat;
		this._EditQuestion["CreatedAt"]=this._createdat;
		this._EditQuestion["QuesText"]=this._content;

		//console.log(this._EditQuestion);

		this._JSONModelQuestionData["QuestionCollection"][this._QNumber]=this._EditQuestion;
     	this.getModel().setData(this._JSONModelQuestionData,false);
     	//update server json file 
     	$.ajax({
			  type: 'POST',
			  url: "http://localhost/model/savejson.php",//url of receiver file on server
			  data: {data:JSON.stringify(this._JSONModelQuestionData)}, //your data
			  success: function(){alert('file updated hf');}, //callback when ajax request finishes
			});
     	sap.ui.getCore().byId("EditQuestion").getController().clearEditorContent();
	},

	onAfterRendering: function() {
		
		tinymce.init({
		        selector: "#CreateQuestionTAEdit",
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
		        init_instance_callback : function(editor) 
		        {
	        		//console.log("Editor: " + editor.id + " is now initialized.");
	        		var init_content = sap.ui.getCore().getModel().getProperty(sap.ui.getCore().byId("DetailPF").getBindingContext()+"/QuesText");
	        		//console.log(init_content);
	        		tinyMCE.get(editor.id).setContent(init_content);
	        	}
		});
	},


});