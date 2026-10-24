import { Course } from '../model/course';
import { Store } from './store.service';

describe('Store.saveCourse', () => {
    let store: Store;
    const originalCourse: Course = {
        id: 1,
        description: 'Original',
        iconUrl: '',
        courseListIcon: '',
        longDescription: '',
        category: 'BEGINNER',
        lessonsCount: 0
    };

    beforeEach(() => {
        store = new Store();
        (store as any).subject.next([originalCourse]);
    });

    it('publishes the update only after the server confirms success', (done) => {
        let resolveResponse: (response: Response) => void;
        spyOn(globalThis, 'fetch').and.returnValue(new Promise((resolve) => {
            resolveResponse = resolve;
        }));

        store.saveCourse(1, { description: 'Updated' }).subscribe(
            () => {
                expect(store['subject'].getValue()[0].description).toBe('Updated');
                done();
            },
            done.fail
        );

        expect(store['subject'].getValue()[0].description).toBe('Original');
        resolveResponse({ ok: true, status: 200 } as Response);
    });

    it('rejects an HTTP error without publishing the update', (done) => {
        spyOn(globalThis, 'fetch').and.returnValue(Promise.resolve({ ok: false, status: 500 } as Response));

        store.saveCourse(1, { description: 'Updated' }).subscribe(
            () => done.fail('Expected the failed HTTP response to be an observable error'),
            (error) => {
                expect(error).toEqual(jasmine.any(Error));
                expect(store['subject'].getValue()[0].description).toBe('Original');
                done();
            }
        );
    });
});
