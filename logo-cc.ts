import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLogoCC]'
})
export class LogoCCDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('input', ['$event.target'])
  onInput(inputElement: EventTarget | null) {
    // Verifica se o elemento de entrada é um HTMLInputElement e não é nulo
    if (inputElement instanceof HTMLInputElement) {
      const value = inputElement.value;
      
      // Remove qualquer imagem de bandeira anterior
      this.removeExistingLogo();

      // Determina a bandeira com base nos primeiros dígitos
      let imageSrc = '';
      const firstDigits = value.substring(0, 2);

      if (firstDigits.startsWith('4')) {
        imageSrc = 'assets/img/vista.png';
      } else if (firstDigits.startsWith('5')) {
        imageSrc = 'assets/img/blastercard.png';
      } else if (firstDigits.startsWith('37')) {
        imageSrc = 'assets/img/brazilian-express.png';
      }

      // Se uma bandeira foi identificada, cria e exibe a imagem
      if (imageSrc) {
        this.createAndAppendImage(imageSrc);
      }
    }
  }

  private createAndAppendImage(src: string) {
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', src);
    this.renderer.setStyle(img, 'height', '24px');
    this.renderer.setStyle(img, 'margin-left', '8px');
    this.renderer.appendChild(this.el.nativeElement.parentNode, img);
  }

  private removeExistingLogo() {
    const parent = this.el.nativeElement.parentNode;
    const existingImg = parent.querySelector('img');
    if (existingImg) {
      this.renderer.removeChild(parent, existingImg);
    }
  }
}