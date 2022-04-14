

export const getHoardData = (topicdata, topicFollowdata, topicCommentdata) => {
    if (JSON.stringify(topicdata) !== "{}" && topicFollowdata && topicFollowdata.length > 0) {
        topicFollowdata.map(item1 => {
            return item1.commentdata = topicCommentdata.filter(item2 => {
                return item2.parentid === -1 && item2.topicfollowid === item1.topicfollowid
            })
        })
        topicFollowdata.map(item => {
            item.commentdata.map(item1 => {
                return item1.sonComment = topicCommentdata.filter(item2 => {
                    return item2.parentid === item1.topiccommentid
                })
            })
            return item
        })
        topicdata.topicfollowdata = topicFollowdata
    }
    return topicdata
} 