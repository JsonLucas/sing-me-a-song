import { prisma } from '../../src/database';
import { recommendationService } from '../../src/services/recommendationsService';

describe('recommendations tests', () => {
    beforeAll(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`;
    });
    (async () => { // seed
        const body = { name:'recommendation', youtubeLink: 'https://www.youtube.com/watch?v=2NTyyCwwDfY' }
        await prisma.recommendation.create({ data: { ...body } });
    })();
    const prototype = { id: 0, name: '', youtubeLink: '', score: 0 };
    it('should create a recommendation', async () => {
        const body = { name:'comeback kid - wake the dead', youtubeLink: 'https://www.youtube.com/watch?v=2NTyyCwwDfY' };
        const insert = await recommendationService.insert(body);
        expect(insert).toBe(Object.setPrototypeOf(insert, prototype));
    });
    it('shoud get a recommendation', async () => {
        const recommendations = await recommendationService.getById(1);
        expect(recommendations).not.toBeNull;
    });
    it('should up vote a recommendation', async () => {
        const upVote = await recommendationService.upvote(1);
        expect(upVote).toEqual(true);
    });
    it('should down vote a recommendation', async () => {
        const { score } = await recommendationService.getById(1);
        const downVote = await recommendationService.downvote(1);
        if(score === -4) { 
            expect(downVote).toEqual('exclusion');
        }else{
            expect(downVote).toEqual('decrement');
        }
    });
    it('should get all recommendations', async () => {
        const recommendations = await recommendationService.get();
        expect(recommendations).not.toBeNull;
    });
    it('should get a random recommendation', async () => {
        const recommendation = await recommendationService.getRandom();
        expect(recommendation).not.toBeNull;
    });
    it('should get amount of recommendations', async () => {
        const random = Math.floor((Math.random() * 10) + 1);
        const recommendations = await recommendationService.getTop(random);
        expect(recommendations).not.toBeNull;
    });
});