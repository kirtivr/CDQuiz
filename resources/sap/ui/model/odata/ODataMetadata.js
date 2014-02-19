/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.odata.ODataMetadata");sap.ui.base.Object.extend("sap.ui.model.odata.ODataMetadata",{constructor:function(m,l){this.oModel=m;this.oMetadata=null;this._loadMetadata(m,l)},metadata:{publicMethods:["getServiceMetadata"]}});
sap.ui.model.odata.ODataMetadata.prototype._loadMetadata=function(m,a){var r=m._createRequest("$metadata",null,a);var t=this;function _(M,R){t.oMetadata=M;if(!m.bUseBatch){m.bUseBatch=t._getUseBatchExtensionValue()}t.oModel.fireMetadataLoaded();t.oModel.refresh()}function b(e){t.oModel._handleError(e)}OData.read(r,_,b,OData.metadataHandler)};
sap.ui.model.odata.ODataMetadata.prototype.getServiceMetadata=function(){return this.oMetadata};
sap.ui.model.odata.ODataMetadata.prototype._getEntityTypeByPath=function(p){if(!p){return null}if(!this.oMetadata||jQuery.isEmptyObject(this.oMetadata)){return null}var c=p.replace(/^\/|\/$/g,""),P=c.split("/"),l=P.length,a,A,o,e,E,b,r,t=this;if(P[0].indexOf("(")!=-1){P[0]=P[0].substring(0,P[0].indexOf("("))}if(l>1){o=t._getEntityTypeByPath(P[0]);for(var i=1;i<P.length;i++){if(o){if(P[i].indexOf("(")!=-1){P[i]=P[i].substring(0,P[i].indexOf("("))}if(o.navigationProperty){r=t._getEntityTypeByNavProperty(o,P[i]);if(r){o=r}}b=o}}}else{E=this._splitName(this._getEntityTypeName(P[0]));b=this._getObjectMetadata("entityType",E[0],E[1]);if(b){b.entityType=this._getEntityTypeName(P[0])}}if(!b){var f=P[P.length-1];var F=this._getFunctionImportMetadata(f,"GET");if(F&&F.entitySet){b=this._getEntityTypeByPath(F.entitySet);if(b){b.entityType=this._getEntityTypeName(F.entitySet)}}}return b};
sap.ui.model.odata.ODataMetadata.prototype._splitName=function(f){var p=[];if(f){var s=f.lastIndexOf(".");p[0]=f.substr(s+1);p[1]=f.substr(0,s)}return p};
sap.ui.model.odata.ODataMetadata.prototype._getEntityTypeName=function(c){var e;if(c){jQuery.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityContainer){jQuery.each(s.entityContainer,function(k,E){jQuery.each(E.entitySet,function(j,o){if(o.name===c){e=o.entityType;return false}})})}})}return e};
sap.ui.model.odata.ODataMetadata.prototype._getObjectMetadata=function(o,O,n){var a;if(O&&n){jQuery.each(this.oMetadata.dataServices.schema,function(i,s){if(s[o]&&s.namespace===n){jQuery.each(s[o],function(j,c){if(c.name===O){a=c;return false}});return!a}})}return a};
sap.ui.model.odata.ODataMetadata.prototype._getUseBatchExtensionValue=function(){var u=false;jQuery.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityContainer){jQuery.each(s.entityContainer,function(k,e){if(e.extensions){jQuery.each(e.extensions,function(l,E){if(E.name==="use-batch"&&E.namespace==="http://www.sap.com/Protocols/SAPData"){u=(typeof E.value==='string')?(E.value.toLowerCase()==='true'):!!E.value;return false}})}})}});return u};
sap.ui.model.odata.ODataMetadata.prototype._getFunctionImportMetadata=function(f,m){var o=null;jQuery.each(this.oMetadata.dataServices.schema,function(i,s){if(s["entityContainer"]){jQuery.each(s["entityContainer"],function(j,e){if(e["functionImport"]){jQuery.each(e["functionImport"],function(k,F){if(F.name===f&&F.httpMethod===m){o=F;return false}})}return!o})}return!o});return o};
sap.ui.model.odata.ODataMetadata.prototype._getEntityTypeByNavProperty=function(e,n){var t=this,a,A,E,N;jQuery.each(e.navigationProperty,function(k,o){if(o.name===n){a=t._splitName(o.relationship);A=t._getObjectMetadata("association",a[0],a[1]);if(A){var b=A.end[0];if(b.role!==o.toRole){b=A.end[1]}E=t._splitName(b.type);N=t._getObjectMetadata("entityType",E[0],E[1]);if(N){N.entityType=b.type}return false}}});return N};
sap.ui.model.odata.ODataMetadata.prototype._getNavigationPropertyNames=function(e){var n=[];if(e.navigationProperty){jQuery.each(e.navigationProperty,function(k,N){n.push(N.name)})}return n};
sap.ui.model.odata.ODataMetadata.prototype._getPropertyMetadata=function(e,p){var P,t=this;p=p.replace(/^\/|\/$/g,"");var a=p.split("/");jQuery.each(e.property,function(k,b){if(b.name===a[0]){P=b;return false}});if(P&&a.length>1&&!jQuery.sap.startsWith(P.type.toLowerCase(),"edm.")){var n=this._splitName(P.type);P=this._getPropertyMetadata(this._getObjectMetadata("complexType",n[0],n[1]),a[1])}if(!P&&a.length>1){var o=this._getEntityTypeByNavProperty(e,a[0]);if(o){P=t._getPropertyMetadata(o,a[1])}}return P};
