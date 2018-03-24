import { HostBinding, Input, Directive, Component, HostListener, Injectable, ViewChild, ViewContainerRef, ElementRef, TemplateRef } from "@angular/core";



@Injectable()
export class OnlineService{
    online = true;
    constructor(){
        setInterval(()=>{
            this.online = Math.random() > 0.5;
        }, 1000);
    }
}


@Directive({
    selector: '[tree]'
})
export class TreeDirective{
    constructor(
        el: ElementRef,
        private view: ViewContainerRef,
        private tamplate: TemplateRef<any>
    ){
        console.log(el.nativeElement);
    }

    ngAfterViewInit(){
        this.view.createEmbeddedView(this.tamplate);
        this.view.createEmbeddedView(this.tamplate);
    }
}


@Directive({
    selector: '[online]'
})
export class OnlineDirective{
@HostBinding('disabled') get disabled(){
    return this.online.online;
}

@HostBinding('class.offline') get offline(){
    return this.online.online;
}

    constructor(private online: OnlineService){}
}




@Injectable()
export class TrackingService{
    logs =[];
    log(trackingEvents){
        this.logs.push(trackingEvents);
        console.log(this.logs);
    }
}



@Directive({
    selector: '[track]'
})
export class TrackDirective{
    @Input() track
    @HostBinding() get innerText(){
        return this.track;
    }
    @HostListener('click', ['$event']) onClick($event){
       
        this.tracking.log({event: 'click', message:this.track})
        //this.track ='clicked';
    }

    constructor(private tracking: TrackingService){}
}

@Component({
    selector: 'basic',
    template: `
        <template #foo> 
            This is content inside a template
        </template>
        <template #bar let-message="message"> 
            {{message}}
        </template>

        <div [ngTemplateOutlet]="bar" [ngOutletContext]="{message: 'Hello context'}"></div>`
})
export class BasicComponent{
    @ViewChild('foo') template;

    constructor(private view: ViewContainerRef){}

    ngAfterContentInit(){
        this.view.createEmbeddedView(this.template);
    }
}

@Component({
    selector: 'app',
    template: `
    <basic online [track]="'Something'"></basic>
    <basic [track]="'Another'"></basic>
    <basic [track]="'Third'"></basic>
    <h1 *tree> Hello, Angular </h1>
    `
})
export class AppComponent{}