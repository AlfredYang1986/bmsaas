import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title'],
    checkedNumber: "2",
    actions: {
        choicetest() {
            var num  = this.get('checkedNumber');
            console.log(num);
            var count = 0;
            if(count == 0) {
                this.set('selected',"√")
                count = 1;
            } else {
                this.document.getElementsByTagName('p').style.color="red";
                count = 0;
            }

        	var a=0;
        	// for(var i=0;i<choicearr.length;i++)
        	// 	if(choicearr[i].checked){
            //         console.log(choicearr[i].checked)
        	// 		a=a+1;
        	// 	}
            // 	if(a==num){
            // 		for(var i=0;i<choicearr.length;i++)
            // 			if(!choicearr[i].checked)
            // 				choicearr[i].disabled='disabled';
            // 	}else{
            // 		for(var i=0;i<choicearr.length;i++)
            // 			choicearr[i].removeAttribute('disabled');
            // 	}
        }
    }

});
