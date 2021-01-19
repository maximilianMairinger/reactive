import Component from "./../component";

type Level = "information" | "success" | "error"

// TODO: Clean up
export default class Notification extends Component {
    private infoText:       HTMLElement;
    private infoClose:      HTMLElement;
    private infoCloseAll:   HTMLElement;
    private infoTitleOpts:  HTMLElement;
    private headingText:    HTMLElement;

    private container: HTMLElement;

    public closing: boolean = false;

    private _type: "information" | "success" | "error";

    constructor(headingText?: string, message?: string, type?: "information" | "success" | "error", public onClose?: Function, public onCloseAll?: Function) {
      super(false);

      this.container = ce("notification-container");

      let side = ce("notification-side");
      let infoIcon = ce("notification-icon");
      let infoSec = ce("notification-section");
      let infoTitleSec = ce("notification-heading-section");
      this.headingText = ce("notification-heading-text");
      this.infoTitleOpts = ce("notification-heading-options");
      this.infoClose = ce("notification-close-button");
      this.infoText = ce("info-text");

      this.infoClose.on("click", () => {if (this.onClose !== undefined) this.onClose(this)});

      this.infoTitleOpts.apd(this.infoClose);
      infoTitleSec.apd(this.headingText, this.infoTitleOpts);
      infoSec.append(infoTitleSec);
      if (message !== undefined) infoSec.apd(this.infoText);
      side.apd(infoIcon);

      this.container.apd(side, infoSec);

      this.apd(this.container);

      if (headingText !== undefined) this.heading(headingText)
      if (message !== undefined) this.msg(message)
      if (type !== undefined) this.type(type)
    }

    public heading(): string
    public heading(to: string): this
    public heading(to?: string): any {
      return this.headingText.txt(to)
    }

    public msg(t): string
    public msg(to: string): this
    public msg(to?: string): any {
      return this.infoText.txt(to)
    }

    public type(): Level
    public type(to: Level): this
    public type(to?: Level) {
      if (to !== undefined) {
        this._type = to;
        this.container.childs("*").addClass(to);
        return this
      }
      else return this._type;
    }

    public addCloseAllOption():void {
        this.infoCloseAll = ce("notification-close-all");
        this.infoCloseAll.txt("Close all")
        this.infoTitleOpts.append(this.infoCloseAll);
        this.infoCloseAll.on("click", () => {if (this.onCloseAll !== undefined) this.onCloseAll()});
    }

    public close() {
      this.infoClose.click();
    }

    public removeCloseAllOption():void {
      this.infoCloseAll.remove();
    }

    public hasCloseAll():boolean {
      return this.infoCloseAll !== undefined;
    }
    stl() {
      return require('./notification.css').toString();
    }
    pug() {
      return ""
    }

}

window.customElements.define('c-notification', Notification);
