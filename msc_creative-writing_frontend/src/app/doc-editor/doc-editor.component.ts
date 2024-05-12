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
import { SharedDataService } from '../services/shared-data.service';
import { ChapterService } from '../services/chapter.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  styleUrl: './doc-editor.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DocEditorComponent implements OnInit, OnDestroy{

  constructor(private sharedData : SharedDataService, private chapterService : ChapterService, private router: Router, private toastr: ToastrService) {}
  
  demo: boolean = true;

  editor: Editor = new Editor();

  chapter: StoryChapter = {
    docID : undefined,
    storyID: '',
    title: '',
    body: ''

  }

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  editorForm = new FormGroup({
    title: new FormControl(this.chapter.title ?? '', Validators.required()),
    editorContent: new FormControl(this.chapter.body ?? '', Validators.required()),
  });

  ngOnInit(): void {
    if (localStorage.getItem('custom_token') != null) {
      this.demo = false;
    }
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
    if (this.demo === false) {
      let temp_chap = this.sharedData.getSelectedChapter();
      if (temp_chap) {
        this.chapterService.getChapter(temp_chap).subscribe(c => {
          this.chapter = c;
          console.log(c);
          this.editorForm.controls.title.setValue(this.chapter.title);
          this.editorForm.controls.editorContent.setValue(this.chapter.body);
        });
      }
    }
  }

  save() {
    if (this.chapter.docID == undefined) {
      this.chapter = {
        storyID: localStorage.getItem('selectedStoryDocID') ?? '',
        title: this.editorForm.controls.title.value ?? '',
        body: this.editorForm.controls.editorContent.value ?? ''
      }
      this.chapterService.createChapter(this.chapter).subscribe(ch => {
        console.log(ch);
        this.showSuccess();
      });
    } else {
      this.chapter = {
        docID: this.chapter.docID,
        storyID: localStorage.getItem('selectedStoryDocID') ?? '',
        title: this.editorForm.controls.title.value ?? '',
        body: this.editorForm.controls.editorContent.value ?? ''
      }
      this.chapterService.updateChapter(this.chapter).subscribe(ch => {
        console.log(ch);
        this.showSuccess();
      });
    }
  }

  closeEditor() {
    this.sharedData.setSelectedChapter(undefined);
    this.router.navigateByUrl("/nav/chapters");
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  showSuccess() {
    this.toastr.success('A Fejezet elmentve!', 'Fejezet mentés');
  }

  showFailure() {
    this.toastr.error('Sikertelen mentés, hiba lépett fel!', 'Fejezet mentés', {
      closeButton: true
    });
  }
}
