import React, { useState } from "react";
import { app, users } from "../mongo";
import "../styles/DocModal.css";

export default function DocModal({ name, message, show, hide, id }) {
  const [updatedmessage, setUpdatedMessage] = useState("");
  const [notif, setNotif] = useState();

  const docName = app.currentUser?.profile?.name;

  const deleteDoc = async () => {
    const result = await users
      .deleteOne({ _id: id })
      .then(() => alert("Deleted!"))
      .then(() => setTimeout(() => hide(), 2000));
  };

  const updateDoc = async () => {
    const update = await users
      .updateOne(
        {
          docName: docName,
        },
        {
          $set: { doc: { name: name, message: updatedmessage } },
        }
      )
      .then(() => setNotif(!notif))
      .then(() => setTimeout(() => hide(), 2000));

    console.log(update);
  };

  return (
    <>
      {show && (
        <div className="modal">
          <p className={!notif ? "notif" : "notif pop-notif"}>Updated</p>
          <section className="modal_info">
            <div className="modal_info-header">
              <div>
                <h3>{name}</h3>
                <em>{id.getTimestamp().toLocaleString()}</em>
              </div>
              <button onClick={hide}>
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form className="modal_form">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={updatedmessage !== "" ? updatedmessage : message}
                onChange={(e) => setUpdatedMessage(e.target.value)}
              ></textarea>
            </form>

            <div className="modal_info-bottom">
              <button
                onClick={updateDoc}
                disabled={updatedmessage === "" ? true : false}
                id="updateBtn"
              >
                {updatedmessage !== "" ? (
                  <>
                    Update <i class="fa-solid fa-pen-to-square"></i>
                  </>
                ) : (
                  "No change"
                )}
              </button>
              <button onClick={deleteDoc} id="delBtn">
                Delete<i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
