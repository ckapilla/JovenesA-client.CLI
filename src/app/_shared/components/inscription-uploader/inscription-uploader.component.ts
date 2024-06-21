import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FileSystemFileEntry, NgxFileDropEntry } from "ngx-file-drop";
import { InscriptionDataService } from "../../data/inscription-data.service";
import { SessionService } from "../../services/session.service";
import { UrlService } from "../../services/url.service";

@Component({
  selector: "app-inscription-uploader",
  templateUrl: "./inscription-uploader.component.html", // ,
  // styleUrls: ['./app.component.scss']
})
export class InscriptionUploaderComponent {
  public files: NgxFileDropEntry[] = [];
  WebApiPrefix: string;
  errorMessage = "";
  successMessage = "";
  @Input() inscriptionId: number;
  @Input() gradesProcessingPeriodId: number;
  constructor(
    private http: HttpClient,
    private webApiPrefixService: UrlService,
    private session: SessionService,
    private inscriptionDataSvc: InscriptionDataService
  ) {
    console.log("inscription uploader constructor with inscriptionId= " + this.inscriptionId);
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.errorMessage = "";
    this.successMessage = "";
    this.files = files;
    for (const currFile of files) {
      if (currFile.fileEntry.isFile) {
        const fileEntry = currFile.fileEntry as FileSystemFileEntry;
        // interface File extends Blob {
        fileEntry.file((file: File) => {
          const date = new Date(file.lastModified);
          console.log("fileEntry last modified: " + date.toDateString());
          console.log("fileEntry relativePath: " + currFile.relativePath);
          console.log("filEntry.name: ", file.name);
          const ext = file.name.substr(file.name.length - 4, 4);
          console.log("extension = " + ext);
          console.log(ext.toLocaleLowerCase() !== ".png");
          console.log("filEntry.size: ", file.size);
          let localError = "";
          if (ext.toLocaleLowerCase() !== ".png") {
            localError = "El archivo [" + file.name + "] no está en formato .png.";
            this.errorMessage = localError;
          } else if (file.size > 204800) {
            localError = "El archivo [" + file.name + "] excede el límite de 200kb de tamaño.";
            this.errorMessage = localError;
          } else {
            const frmData = new FormData();
            frmData.append("file", file);
            // frmData.append('studentGUID', this.session.getStudentRecordGUId());
            this.inscriptionDataSvc
              .uploadInscriptionImage(
                frmData,
                this.session.getStudentRecordGUId(),
                this.inscriptionId,
                this.gradesProcessingPeriodId,
                date.toDateString()
              )
              .subscribe(
                // this.becaData.uploadStudentGradesReport(frmData).subscribe(
                () => {
                  this.successMessage = "El archivo [" + file.name + "] se cargó correctamente";
                  // window.scrollTo(0, 0);
                  // window.setTimeout(() => {
                  //   this.successMessage = '';
                  // }, 15000);
                },
                (error) => {
                  this.errorMessage = error;
                }
              );
          }
        });
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
