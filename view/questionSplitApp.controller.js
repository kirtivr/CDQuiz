sap.ui.controller("sap.ui.demo.myFiori.view.questionSplitApp",
					{
						//for binding detail template to the model
						to : function (pageId, context) {
		
							var app = sap.ui.getCore().byId("myquestions");
							
							app.to(pageId);
							
							// set data context on the page
							if (context) {
								var page = app.getPage(pageId);
								page.setBindingContext(context);
							}
						},
						handleNavButtonPress : function (evt) 
						{
							var app = sap.ui.getCore().byId("myFiori");
							app.backToPage("homePage");
						}, 

					}
					);