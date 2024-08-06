import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast'; 
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    MessagesModule,
    MessageModule,
    ImageModule,
    CardModule,
    TabViewModule,
    MenubarModule,
    MenuModule,
    SidebarModule
    
    
  ],
  exports: [
    ButtonModule,
    DropdownModule,
    TableModule, 
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    ImageModule,
    CardModule,
    TabViewModule,
    MenubarModule,
    MenuModule,
    SidebarModule
    

  ]
})
export class PrimengModule {

}
