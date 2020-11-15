/*****************************************************************************************************************/
/*                                                                                                               */
/*                                Biblioth�que  MIW   version:  miw V  13 11 2020.js                             */
/*                                En cours de r�alisation                                                        */
/*                                Licence  Mention Mobilit� - Internet & Web    (MIW)                            */
/*                                                                                                               */
/*                                IUT d'Aix-en-Provence D�partement GEA GAP                                      */
/*                                Site internet de la licence :                                                  */
/*    https://iut.univ-amu.fr/diplomes/licence-professionnelle-informatique-applications-mobilite-internet-web   */                                                                                                      
/*****************************************************************************************************************/

(function(){  // ief  ou fie fonction imm�diatement ex�cut�e.

/******************************************************************************************************/
/***********************  Les expressions r�guli�res    ***********************************************/
/******************************************************************************************************/ 
		Reg = {	        // objet contenant des expressions r�guli�res � am�liorer et � compl�ter
			required 	:	/^.+/,
			alpha  		:  	/^[a-z ._-]+$/i,
			alphanum 	: 	/^[a-z0-9 ._-]+$/i,
			digitSign 	: 	/^[-+]?[0-9]+$/,
			digit		:	/^[0-9]+$/,
			nodigit 	: 	/^[^0-9]+$/,
			number 		: 	/^[-+]?(\d*\.?\d+)|(\d+\.?\d*)$/,
			email 		: 	/^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
			url 		: 	/^(http|https):\/\/[a-z0-9\-\.\/_]+\.[a-z]{2,3}$/i,          			
		};


/******************************************************************************************************/
/***********************  Les Raccourcis   pour le DOM  ***********************************************/
/******************************************************************************************************/


/* recherche de noeuds */

		_   = 	function(sCss)	{
					 if (document.querySelectorAll(sCss).length==0)  		return null;
		                else if (document.querySelectorAll(sCss).length==1) return document.querySelector(sCss);
					          else 											return document.querySelectorAll(sCss);
				};
				


		_cf = 	function()    	{return document.createDocumentFragment();};		
		
		_ct =  	function(txt,nodeInsert){ let t = document.createTextNode(txt);
											  if (nodeInsert) nodeInsert.appendChild(t);
											  return t;
										};

		
		_ce = 	function(el,nodeInsert) { let e = document.createElement(el);
											  if (nodeInsert) nodeInsert.appendChild(e);
											  return e;
										};
	

		_cn = 	function(node,attribut,style,nodeInsert){  // pour cr�er un noeud avec des attributs et des styles ( attributs et style sont des objets )
					let n = _ce(node);
						n.attrib(attribut);
						n.css(style);
						if (nodeInsert) nodeInsert.appendChild(n);
						return n;
				}
			
		_dn = 	function(node){                               // pour supprimer un noeud
					node.parentNode.removeChild(node);
				}

		
		// raccourcis moins utiles	
		
		_id = function(id){return document.getElementById(id)		;};
		_tn = function(tn){return document.getElementsByTagName(tn)	;};
		_n  = function(n) {return document.getElementsByName(n)		;};  

/******************************************************************************************************/
/***********************  Raccourci   pour console.log  ***********************************************/
/******************************************************************************************************/

		cl= function(n){return console.log(n)};
		
/*******************************************************************************************************/
/***********************  Extension de la classe Object avec la methode forEach    *********************/
/*******************************************************************************************************/
// forEach: m�thode pour parcourir les propri�t�s d'un objet et les traiter avec une fonction callback
		Object.prototype.forEach=	function(f){                 
										for ( var i in this ){
                                            if (this.hasOwnProperty(i))	 f(i,this[i]);										
											// i: propri�t�   this[i]:valeur de la propri�t�
											//f(i,this[i]);
										}
									};
									

/******************************************************************************************************/
/***********************  Extension de toutes les classes avec la methode extend  *********************/
/******************************************************************************************************/				

Object.prototype.extend =	function(obj){
										for( var i in obj){this[i] =  obj[i]};
		                                //obj.forEach((i,j)=>{this[i] =  obj[i]})
						   };

/*  		
		String.prototype.extend =	function(obj){
										//for( var i in obj){this[i] =  obj[i]};
		                                obj.forEach((i,j)=>{this[i] =  obj[i]})
									};
		Array.prototype.extend  =	function(obj){  
										//for( var i in obj){this[i] =  obj[i]};
		                                obj.forEach((i,j)=>{this[i] =  obj[i]})
									};
		Number.prototype.extend	=	function(obj){  
										//for( var i in obj){this[i] =  obj[i]};
		                                obj.forEach((i)=>{this[i] =  obj[i]})
									};
		Node.prototype.extend	=	function(obj){  
										//for( var i in obj){this[i] =  obj[i]};
		                                obj.forEach((i)=>{this[i] =  obj[i]})
									};  */
								
/******************************************************************************************************/
/***********************  Extension de la classe String  ***********************************************/
/******************************************************************************************************/			
					  
						  
						  
		String.prototype.extend({
			
			left  		: function(n){return this.substring(0,n)},
			
			right 		: function(n){return this.substring(this.length-n)},
			
			capitalize	: function(){
							return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
						},
			
			trim		: function(){                               // cette m�thode existe d�j� pour String
							return this.replace(/(^\s*|\s*$)/g,"")
						}
		});
		
		//console.log(String.prototype)
/******************************************************************************************************/
/***********************  Extension de la classe Array   ***********************************************/
/******************************************************************************************************/		
		
		Array.prototype.extend({
			merge		: function(t){ 
							for (var i =0; i< t.length;i++){
								this.push(t[i]);
							}
							//t.forEach((i)=>{this.push(t[i])})
							
							return this;
						}			
		});
/******************************************************************************************************/
/***********************  Extension de la classe Number  ***********************************************/
/******************************************************************************************************/		
		Number.prototype.extend({
			p		: function(n){ return Math.pow(this,n)}
		});		
/******************************************************************************************************/
/***********************  Extension de la classe Node    ***********************************************/
/******************************************************************************************************/		
 		Node.prototype.extend({
			changeId 	: function(val){ 
							this.id=val;
							return this;
						},
			css 		: function(obj) {     // permet d'affecter au noeud les propri�t�s de style contenues dans l'objet obj
							
							//if (obj!=null) obj.forEach((i,j)=>{ this.style[i]=obj[i]})
						     for( let  i in obj){
								if (obj.hasOwnProperty(i)) this.style[i]=obj[i];
							}; 
							return this;
						},

			attrib 		: function(obj){         // permet d'affecter au noeud les attributs contenus dans l'objet obj		
							
							//if (obj!=null) obj.forEach((i,j)=>{this.setAttribute(i,obj[i])})
			 				for( let i in obj ){
								if (obj.hasOwnProperty(i))	this.setAttribute(i,obj[i])
							};  
							return this;
						},
			appendNode	:  function(n){

							if (typeof n == "string") {      													// n est une chaine de caract�res
									n = _ct(n);
									this.appendChild(n);
									return this;		  
								}			
							else if (typeof n == "object" && n.nodeType==1)  {this.appendChild(n);return this}  // n est un noeud �l�ment	
						},
			
			remove  	:  function(){this.parentNode.removeChild(this)}


			
		});
/******************************************************************************************************/
/***********************  Extension de la classe NodeList    ***********************************************/
/******************************************************************************************************/
		NodeList.prototype.extend({
			onclick	:	function(f){this.forEach(function(a,b){b.onclick=function(){f(a,b)}})}  // a= indice da l'�l�ment dansla liste b= noeud concern�
		});
/******************************************************************************************************/
/***********************  Les propri�t�s de la fen�tre  ***********************************************/
/******************************************************************************************************/ 		
		Window = {				                                                                                       // objet contenant des m�thodes pour g�rer l'�cran.
			width:	function(){
						if (window.innerWidth)  return window.innerWidth           	 	                               // tous les navigateurs sauf IE
						else if (document.documentElement.clientWidth)	return document.documentElement.clientWidth;   // IE Strict
						else if (document.body.clientWidth) return document.body.clientWidth;      		               // IE non strict
						else return -1;                          	                                                   // anciens navigateurs
					},
			height:	function(){
						if (window.innerHeight)   return window.innerHeight;        								   // tous les navigateurs sauf IE
						else if (document.documentElement.clientHeight)  return document.documentElement.clientHeight; // IE Strict
						else if (document.body.clientHeight) return document.body.clientHeight;       	               // IE non strict
						else return -1;	          					                                                   // anciens navigateurs
					}
		};

})();


