import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {

  @Input() numStars: number = 5;
	@Input() onlyRead: boolean = true;
	@Input() value: number = 5;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

	stars: string[] = [];

  constructor() {
    
  }

  ngAfterViewInit(){
    this.calc();
  }

  calc(){
    setTimeout(() => {
      this.stars = [];
      let tmp = this.value;
      for(let i=0; i < this.numStars; i++, tmp--)
        if(tmp >= 1)
          this.stars.push("star");
        else if (tmp < 1 && tmp > 0)
          this.stars.push("star-half");
        else
          this.stars.push("star-outline");
    }, 0);
  }

  starClicked(index){
  	if(!this.onlyRead) {
		  this.value = index + 1;
		  this.calc();
		  this.ionClick.emit(this.value);
	  }
  }

}
