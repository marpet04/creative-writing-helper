import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-img-slider',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './img-slider.component.html',
  styleUrl: './img-slider.component.scss'
})
export class ImgSliderComponent implements OnInit{
  @Input() slides : any[] = [];
  @Input() indicatorVisible = true;
  @Input() animationSpeed = 200;
  @Input() autoPlay = false;
  @Input() autoPlaySpeed = 3000;
  currentSlide = 0;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  hidden = false;

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.jumpToSlide(this.currentSlide);
  }

  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.jumpToSlide(this.currentSlide);
  }

  jumpToSlide(index: number) {
    this.hidden = true;

    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, this.animationSpeed);
  }

  ngOnInit() {
    if(this.autoPlay) {
      setInterval(() => {
        this.next();
      }, this.autoPlaySpeed);
    }
  }

}
