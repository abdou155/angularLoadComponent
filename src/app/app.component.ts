import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  name = 'Angular';

  productForm: FormGroup;

  constructor(private fb:FormBuilder) {

    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]) ,
    });
  }

  @ViewChildren('myinput') inputs:QueryList<ElementRef>


  counter = 0 ;
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {

    return this.fb.group({
      qty: ''
    })

  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
    this.inputs.last.nativeElement.focus()

    this.inputs.changes.subscribe(() => {
        this.inputs.last.nativeElement.focus()
    })

  }

  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
