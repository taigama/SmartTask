import realm, {getNewId} from '../realm/Realm'

export default Helper = {
    ellipsis(content, length){
        return content.length > length? (content.substring(0, length-3) + '...') : content;
    },

    createTask() {
        var tasks = realm.objects('Task');
        var newId = 1;
        if(tasks != null && tasks.length !== 0)
        {
            newId = getNewId(tasks, 'id');
        }
        else if(tasks == null)
        {
            this.initLabel();
        }

        var group = this.createLabelGroup();
        var time = this.createDueTime();
        var checkList = this.createCheckList();

        realm.write(() => {
            realm.create('Task', {
                key: newId,
                title: "New Task",
                description: "",
                lastImageId: 0,
                labelGroup: group,
                dueTime: time,
                checkList: checkList,
                images: []
            });
        });
    },

    initLabel()
    {
        var labels = realm.objects('Label');
        if(labels == null)
        {
            realm.write(() => {

                // added preset labels
                let labels = [
                    realm.create('Label', {
                        key: 1,
                        color: 'red',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 2,
                        color: 'green',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 3,
                        color: 'cyan',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 4,
                        color: 'gray',
                        content: ''
                    }, true),
                    realm.create('Label', {
                        key: 5,
                        color: 'blue',
                        content: ''
                    }, true)
                ];
            });
        }
    },

    createLabelGroup()
    {
        var groups = realm.objects('LabelGroup');
        var newId = 1;
        if(groups != null && groups.length !== 0)
        {
            newId = getNewId(groups, 'id');
        }

        var labels = realm.objects('Label') || [];
        var group;
        realm.write(() => {
            group = realm.create('LabelGroup', {
                id: newId,
                links: []
            });

            labels.forEach((label) => {
                var links = realm.objects('LabelLink');
                var newLinkId = 1;
                if(links != null || links.length !== 0)
                {
                    newLinkId = getNewId(links, 'id');
                }

                group.links.push({
                    key: newLinkId,
                    idLabel: label.id,
                    isCheck: false,
                    labelGroup: group
                });
            });
        });


        return group;
    },

    createDueTime()
    {
        var dueTime;
        var times = realm.objects('DueTime');
        var id = 1;
        if(times != null || times.length !== 0)
        {
            id = getNewId(links, 'id');
        }

        realm.write(() => {
            dueTime = realm.create('DueTime', {
                id: id,
                time: new Date(),
                isCheck: false,
            });
        });

        return dueTime;
    },

    createCheckList()
    {
        var checkList;
        var lists = realm.objects('CheckList');
        var id = 1;
        if(lists != null || lists.length !== 0)
        {
            id = getNewId(links, 'id');
        }

        realm.write(() => {
            checkList = realm.create('CheckList', {
                id: id,
                title: 'CheckList',
                checks: [],
            });
        });

        return checkList;
    }
};

