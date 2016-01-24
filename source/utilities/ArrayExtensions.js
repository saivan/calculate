
function extendArray(){
	Array.prototype.last = function(){return this[this.length-1]}
	Array.prototype.first = function(){return this[0]}
	Array.prototype.contains = function(x){return this.indexOf(x)!==-1}
}

module.exports = extendArray;
