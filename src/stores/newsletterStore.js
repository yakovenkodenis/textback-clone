import { observable, action, runInAction } from 'mobx';

import agent from '../agent';


class NewsletterStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable drafts = [];
    @observable currentDraft = {};

    async fetchDraftsList() {
        /*
            Response format:
            {
                success: true
                data: { ...???... }
            }
        */

        const response = await agent.Newsletter.getList();

        return response.success ? response.data : [];
    }

    @action('Get the detailed list of newsletter drafts')
    getDraftsList = async () => {
        this.inProgress = true;

        const drafts = await this.fetchDraftsList();

        console.log('DRAFTS RESPONSE: ', drafts);

        runInAction(() => {
            this.drafts = drafts;
            this.inProgress = false;
        });
    }


    async saveDraftToAPI(draft, id) {
        /*
            Response format:
            {
                success: true
                data: { ...???... }
            }
        */

        const response = await agent.Newsletter.saveDraft(draft, id);

        return response.success ? response.data : [];
    }

    @action('Get the detailed list of newsletter drafts')
    saveDraft = async (draft, id) => {
        this.inProgress = true;

        const savedDraft = await this.saveDraftToAPI(draft, id);

        console.log('DRAFT SAVE RESPONSE: ', savedDraft);

        // update this.drafts
        runInAction(() => {
            this.inProgress = false;
        });
    }

    async getDraftFromAPI(id) {
        const response = await agent.Newsletter.getDraft(id);

        return response.success ? response.data : [];
    }

    @action('Get newsletter draft')
    getDraft = async (id) => {
        this.inProgress = true;
        
        const currentDraft = await this.getDraftFromAPI(id);
        console.log('DRAFT: ', currentDraft);

        runInAction(() => {
            this.currentDraft = currentDraft;
            this.inProgress = false;
        });
    }
}

export default new NewsletterStore();
