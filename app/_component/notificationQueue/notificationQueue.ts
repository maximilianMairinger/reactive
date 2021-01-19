import Component from "./../component";
import Notification from "../notification/notification";
import Easing from "waapi-easing"

export default class NotificationQueue extends Component {

  private boxList: Array<Notification>;
  constructor() {
    super(false);
    this.boxList = [];
  }

  public appendNotification(noti: Notification): Notification {
    this.boxList.push(noti);
    if(this.boxList.length > 1) {
        if(!this.boxList[0].hasCloseAll()) {
          this.boxList[0].addCloseAllOption();
        }
    }
    this.apd(noti);
    noti.anim({rotateX: .1, translateY: .1, opacity: 1}, {duration: 160, easing: new Easing(0.175, 0.885, 0.32, 1.27499)});
    return noti;
  }

  public closeNotification(notification_index: Notification | number): Promise<boolean> {
    return new Promise(async (res, rej) => {
      let toBeRem:Notification;
      if (typeof notification_index === "number") toBeRem = this.boxList[notification_index];
      else toBeRem = notification_index;
      if (toBeRem === undefined) return rej();
      if (toBeRem.closing) return res(false);
      toBeRem.closing = true;
      await toBeRem.anim({opacity: 0, scale: .8}, {duration: 120, easing: new Easing(.34, .07, 1, .2)});
      this.positionClearAllButton();
      await toBeRem.anim({height: 0, marginTop: 0, marginBottom: 0}, {duration: 240, easing: new Easing(0.5, 0, 0, 1)});
      this.boxList.removeV(toBeRem);
      toBeRem.remove();
      this.positionClearAllButton();
      res(true);
    });
  }

  public closeAllNotifications() {
    this.boxList.forEach((toBeRem) => {
      this.closeNotification(toBeRem);
    });
  }

  public lowerNotificationQueue(by: number) {
    this.anim({translateY: by})
  }

  private positionClearAllButton() {
    if(this.boxList.length === 1) {
      if(this.boxList[0].hasCloseAll()) {
        this.boxList[0].removeCloseAllOption();
      }
    }
    else if(this.boxList.length > 1){
      if(!this.boxList[0].hasCloseAll()) {
        this.boxList[0].addCloseAllOption();
      }
    }
  }
  

  stl() {
    return require('./notificationQueue.css').toString();
  }
  pug() {
    return ""
  }
}

window.customElements.define('c-notification-queue', NotificationQueue);
