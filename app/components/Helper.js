export default Helper = {
    ellipsis(content, length){
        return content.length > length? (content.substring(0, length-3) + '...') : content;
    }
};