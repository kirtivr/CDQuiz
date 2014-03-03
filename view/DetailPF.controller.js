
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");

sap.ui.controller("sap.ui.demo.myFiori.view.DetailPF", {

	editButtonPress:function()
	{
		controller=sap.ui.getCore().byId('EditQuestionPF').getController();
		if (tinyMCE.get('CreateQuestionTAEditPF'))
		{
			this.tacontent=this.getView().getModel().getProperty(this.getView().getBindingContext()+"/QuesText");
			tinyMCE.get('CreateQuestionTAEditPF').setContent(this.tacontent);
		}
		//
		var context = this.getView().getBindingContext();
		this.nav.to("EditQuestionPF",context);



	},
		deleteButtonPress:function()
	{
		this._JSONModelQuestionData = JSON.parse(this.getView().getModel().getJSON());
		console.log(this.getView().getModel().getJSON());
     	this._QCollection = this._JSONModelQuestionData["QuestionCollection"];
     	this._QNstr=this.getView().getBindingContext()+"";
     	this._i=(this.getView().getBindingContext()+"").length-1;
		this._temp='';

     	while((this._QNstr).charAt(this._i)!= '/')
     	{
     		this._temp=(this._QNstr).charAt(this._i)+this._temp;
     		this._i=this._i-1;
     	};
     	this._QNumber=parseInt(this._temp);
     	console.log(this._QNumber);
     	this._JSONModelQuestionData["QuestionCollection"].splice(this._QNumber,1);
     	this.getView().getModel().setData(this._JSONModelQuestionData,false);
     	//update server json file 
     	$.ajax({
			  type: 'POST',
			  url: "http://localhost/model/savejson.php",//url of receiver file on server
			  data: {data:JSON.stringify(this._JSONModelQuestionData)}, //your data
			  success: function(){alert('file updated hf');}, //callback when ajax request finishes
			});
	},
	
	onAfterRendering:function()
	{

		
	}	
		
});