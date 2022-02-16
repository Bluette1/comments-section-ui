import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import ObjectProxy from '@ember/object/proxy';
import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | container-main', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      model: {
        currentUser: ObjectProxy.create({
          png: '../assets/images/image-juliusomo.png',
          webp: '../assets/images/image-juliusomo.webp',
          username: 'juliusomo',
        }),
        comments: [
          {
            id: 1,
            content:
              "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            createdAt: '1 month ago',
            score: 12,
            user: ObjectProxy.create({
              png: '../assets/images/image-amyrobson.png',
              webp: '../assets/images/image-amyrobson.webp',
              username: 'amyrobson',
            }),
            replies: [],
          },
          {
            id: 2,
            content:
              "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            createdAt: '2 weeks ago',
            score: 5,
            user: ObjectProxy.create({
              png: '../assets/images/image-maxblagun.png',
              webp: '../assets/images/image-maxblagun.webp',
              username: 'maxblagun',
            }),
            replies: [
              {
                id: 3,
                content:
                  "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                createdAt: '1 week ago',
                score: 4,
                replyingTo: 'maxblagun',
                user: ObjectProxy.create({
                  png: '../assets/images/image-ramsesmiron.png',
                  webp: '../assets/images/image-ramsesmiron.webp',
                  username: 'ramsesmiron',
                }),
              },
              {
                id: 4,
                content:
                  "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                createdAt: '2 days ago',
                score: 2,
                replyingTo: 'ramsesmiron',
                user: ObjectProxy.create({
                  png: '../assets/images/image-juliusomo.png',
                  webp: '../assets/images/image-juliusomo.webp',
                  username: 'juliusomo',
                }),
              },
            ],
          },
        ],
      },
    });
  });

  test('it renders', async function (assert) {
    await render(hbs`<ContainerMain @model={{this.model}} />`);
    assert.dom('.main').exists();
    assert.dom('.container-main').exists();
  });

  test('it renders delete component when the deleteComent variable is set to true ', async function (assert) {
    class MockshowDeleteCommentService extends Service {
      deleteComment = true;
    }
    this.owner.register(
      'service:show-delete-comment',
      MockshowDeleteCommentService
    );

    await render(hbs`<ContainerMain @model={{this.model}} />`);
    assert.dom('.main').exists();
    assert.dom('.container-main').exists();
    assert.dom('.delete-comment-div').exists();
  });

  test("it doesn't render delete component when the deleteComent variable is set to false ", async function (assert) {
    class MockshowDeleteCommentService extends Service {
      deleteComment = false;
    }
    this.owner.register(
      'service:show-delete-comment',
      MockshowDeleteCommentService
    );

    await render(hbs`<ContainerMain @model={{this.model}} />`);
    assert.dom('.main').exists();
    assert.dom('.container-main').exists();
    assert.dom('.delete-comment-div').doesNotExist();
  });
});
