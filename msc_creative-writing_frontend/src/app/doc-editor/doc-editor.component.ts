import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { Editor, NgxEditorModule, Toolbar, Validators, schema } from 'ngx-editor';
import { StoryChapter } from '../models/StoryChapter';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  standalone: true,
  imports: [
    NgxEditorModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrl: './doc-editor.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DocEditorComponent implements OnInit, OnDestroy{
  editor: Editor = new Editor();

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  constructor() {}


  ngOnInit(): void {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      plugins: [],
      schema,
      nodeViews: {},
      attributes: {},
      linkValidationPattern: ''
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
