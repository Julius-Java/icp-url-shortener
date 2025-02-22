import Array "mo:base/Array";
import Random "mo:base/Random";
import Nat8 "mo:base/Nat8";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
  type Url = {
    id : Text;
    long_url : Text;
    short_url : Text;
  };

  type Return<T> = {
    data : ?T;
    status : Bool;
    message : Text;
  };

  stable var urls : [Url] = [];

  let base_url = "http://c5kvi-uuaaa-aaaaa-qaaia-cai.localhost:4943/";

  public func shorten_url(long_url : Text) : async Return<Text> {
    let url_id = await generateSimpleId();

    let url : Url = {
      id = url_id;
      long_url = long_url;
      short_url = base_url # url_id;
    };

    urls := Array.append<Url>(urls, [url]);

    return {
      data = ?url.short_url;
      status = true;
      message = "Short url created";
    };
  };

  public query func getUrl(id: Text): async Return<Text> {
    switch(Array.find<Url>(urls, func url = url.id == id)) {
      case (?url) {
        return {
          data = ?url.long_url;
          status = true;
          message = "URL retrieved!"
        };
      };


      case (null) {
        return {
            data = null;
            status = false;
            message = "No url found";
        };
      };
    };
  };

  public func generateSimpleId() : async Text {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let size = 16;
    var id = "";

    for (_ in Iter.range(0, size)) {
      let blob = await Random.blob();
      let rand = Nat8.toNat(Random.byteFrom(blob)) % 36;
      let charArray = Iter.toArray(chars.chars());
      id #= Text.fromChar(charArray[rand]);
    };

    id;
  };
};
