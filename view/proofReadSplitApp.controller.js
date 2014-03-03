sap.ui.controller("sap.ui.demo.myFiori.view.proofReadSplitApp",
					{
						//for binding detail template to the model
						to : function (pageId, context) {
		
							var app = sap.ui.getCore().byId("PFquestions");
							
							app.to(pageId);
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