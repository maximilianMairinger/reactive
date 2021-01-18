import Notification from "../_component/notification/notification";
import NotificationQueue from "../_component/notificationQueue/notificationQueue";
import delay from "delay";


const levelLangTabel = {
  log: "Info",
  error: "Error",
  success: "Hurray"
}


export default class Notifier {
  public static queue = new NotificationQueue();

  /**
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}
   */
  public static log(text: string, options?: NotifierOptions): Notification;
  /**
   * @param title displayed title.
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}
   */
  public static log(title: string, text: string, options?: NotifierOptions): Notification;
  /**
   * @param defaultTitle true if the default title should be used.
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}
   */
  public static log(defaultTitle: boolean, text: string, options?: NotifierOptions): Notification;
  public static log(): Notification {
    //@ts-ignore
    return this.msg("information", ...arguments)
  }


  /**
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}
   */
  public static error(text: string, options?: NotifierOptions): Notification;
  /**
   * @param title displayed title.
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}
   */
  public static error(title: string, text: string, options?: NotifierOptions): Notification;
  /**
   * @param defaultTitle true if the default title should be used.
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}
   */
  public static error(defaultTitle: boolean, text: string, options?: NotifierOptions): Notification;
  public static error(): Notification {
    //@ts-ignore
    return this.msg("error", ...arguments)
  }


  /**
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}   */
  public static success(text: string, options?: NotifierOptions): Notification;
  /**
   * @param title displayed title.
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}   */
  public static success(title: string, text: string, options?: NotifierOptions): Notification;
  /**
   * @param defaultTitle true if the default title should be used.
   * @param text displayed message.
   * @param options {closeAfter: Close after milliseconds; when Infinity or negative notifictaion never closes (defaults to 400)}   */
  public static success(defaultTitle: boolean, text: string, options?: NotifierOptions): Notification;
  public static success(): Notification {
    //@ts-ignore
    return this.msg("success", ...arguments)
  }
  //TODO:
  // warn

  public static msg(type: "information" | "success" | "error", text: string, options?: NotifierOptions): Notification;
  public static msg(type: "information" | "success" | "error", title: string, text: string, options?: NotifierOptions): Notification;
  public static msg(type: "information" | "success" | "error", defaultTitle: boolean, text: string, options?: NotifierOptions): Notification;
  public static msg(type: "information" | "success" | "error", titleTextDefaultTitle: string | boolean, textOptions: string | NotifierOptions = {}, options: NotifierOptions = {}): Notification {
    let closeTime: number = 4000;
    let cb1 = (p) => {
      this.queue.closeNotification(p)
    }
    let cb2 = () => {
      this.queue.closeAllNotifications()
    }
    let noti: Notification;

    if (typeof titleTextDefaultTitle === "string" && typeof textOptions === "object") {
      if (textOptions.duration !== undefined) closeTime = textOptions.duration;
      noti = new Notification("<pre> </pre>", undefined, type, cb1, cb2);
      noti.heading(titleTextDefaultTitle)
    }
    else if (typeof titleTextDefaultTitle === "string" && typeof textOptions === "string") {
      if (options.duration !== undefined) closeTime = options.duration;
      noti = new Notification("<pre> </pre>", "<pre> </pre>", type, cb1, cb2);
      noti.heading(titleTextDefaultTitle)
      noti.msg(textOptions)
    }
    else if (typeof titleTextDefaultTitle === "boolean" && typeof textOptions === "string") {
      if (options.duration !== undefined) closeTime = options.duration;
      noti = new Notification("<pre> </pre>", "<pre> </pre>", type, cb1, cb2);
      noti.heading(levelLangTabel[type])
      noti.msg(textOptions)
    }

    this.queue.appendNotification(noti);

    let dontClose = false
    let mouseOverSub = noti.on("mouseover", () => {
      dontClose = true
      mouseOverSub.deactivate()
    })

    if (closeTime > 0 && closeTime !== Infinity) delay(closeTime).then(() => {
      if (!dontClose) noti.close();
    });
    return noti;
  }
}

interface NotifierOptions {
  duration?: number;
}


