import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title'],
    checkedNumber: "2",
    count: 0,
    actions: {
        choicetest() {
            let checkedArray = [];
            let choicearr = document.getElementsByTagName('label');
            for(var i=0;i<choicearr.length;i++) {
                console.log(choicearr.length);
                console.log(choicearr);
            }

            var count = this.get('count');
            if(count == 0) {
                this.set('select','ok');
                this.set('count',1);
            } else if(count == 1){
                this.set('select','no');
                this.set('count',0);
            }

            var a=0;
            var num = 2;
        	for(var i=0;i<choicearr.length;i++)
        		if(choicearr[i].select == 'ok'){
                    console.log(choicearr[i].checked)
        			a=a+1;
        		}
            	if(a==num){
            		for(var i=0;i<choicearr.length;i++)
            			if(!choicearr[i].checked)
            				choicearr[i].disabled='disabled';
            	}else{
            		for(var i=0;i<choicearr.length;i++)
            			choicearr[i].removeAttribute('disabled');
            	}
        }
    }

});
