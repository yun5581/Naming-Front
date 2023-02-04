import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { vw, vh } from "../../components/SizeConvert";
import { SF_HambakSnow, Pretendard } from "../../components/Text";
import { getDictionary, postLike, deleteDictionary } from "../../api/user";
import { useAppSelector } from "../../redux/store";

//images
import like from "../../images/like.svg";
import deleteIcon from "../../images/definePage/delete.svg";

const ContentComponent = (arrCount, contents) => {
  return (
    <>
      {arrCount
        ? data.map((ele) => {
            <Content>
              <div className="countNum">
                <Pretendard>{ele.postId}.</Pretendard>
              </div>
              <div className="comment">
                <Pretendard>{ele.contents}</Pretendard>
              </div>
              {edit ? (
                <object
                  type="image/svg+xml"
                  data={deleteIcon}
                  className="deleteIcon"
                />
              ) : (
                <div className="like">
                  <object
                    type="image/svg+xml"
                    data={like}
                    className="likeIcon"
                  />
                  <div className="likeNum">
                    <SF_HambakSnow>{ele.likes}</SF_HambakSnow>
                  </div>
                </div>
              )}
            </Content>;
          })
        : null}
    </>
  );
};

export default ContentComponent;

const Content = styled.div`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: ${vh(33)};
  width: 96%;
  margin-bottom: ${vw(16)};
  display: flex;
  align-items: center;

  .countNum {
    margin-left: ${vw(16)};
    margin-right: ${vw(6)};
    font-weight: 400;
    font-size: ${vw(12)};
  }
  .likeIcon {
    width: ${vw(13)};
  }
  .likeNum {
    font-weight: 800;
    font-size: ${vw(8)};
    color: #818181;
    width: fit-content;
    margin: 0 auto;
  }
  .comment {
    width: 72%;
    font-weight: 400;
    font-size: ${vw(12)};
  }
  .like {
    align-items: center;
  }
`;
