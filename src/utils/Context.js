/**
 * Variable global
 * @excample
 * import Context from "Context"
 * Context.Provider(key, value)
 * get value by key anywhere
 * Contxet.Consumer(key); 
 * 
 */
let Context = (function(){
	let obj = {	
	}
	return {
		Consumer: function(key){
			if(obj.hasOwnProperty(key)){
				return obj[key];
			} else {
				return undefined;
			}
		},
		Provider: function(key, value){
			obj[key] = value;
		}
	}
})()
export default Context;