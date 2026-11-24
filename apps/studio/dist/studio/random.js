// A shuffled bag preserves surprise, reaches the whole catalog and never repeats
// the previous result, including across bag boundaries. Injection is for tests.
export class ShuffleBag {
 constructor(values,{current=null,random=Math.random}={}){this.values=[...values];this.random=random;this.last=current;this.bag=[];if(!this.values.length||new Set(this.values).size!==this.values.length)throw new Error('A slot requires unique values');}
 next(){if(!this.bag.length){this.bag=[...this.values];for(let i=this.bag.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[this.bag[i],this.bag[j]]=[this.bag[j],this.bag[i]];}if(this.bag.length>1&&this.bag.at(-1)===this.last){const j=Math.floor(this.random()*(this.bag.length-1));[this.bag[j],this.bag[this.bag.length-1]]=[this.bag.at(-1),this.bag[j]];}}
 this.last=this.bag.pop();return this.last;}
}
