import { observable, action } from 'mobx';


class NewsletterMessageTemplateStore {

    @observable template = {
        startingMessage: '',
        furtherMessages: []
    };

    @action setStartingMessage(message) {
        this.template.startingMessage = message;
    }

    @action addFurtherMessage(message) {
        this.template.furtherMessages.push(message);
    }

    @action reset() {
        this.template.startingMessage = '';
        this.template.furtherMessages = [];
    }

}

export default new NewsletterMessageTemplateStore();
