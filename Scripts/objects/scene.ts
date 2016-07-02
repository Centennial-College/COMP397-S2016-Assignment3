module objects {
    // Scene Class
    export class Scene extends createjs.Container {
        // PROTECTED INSTANCE VARIABLES
        protected _background: createjs.Bitmap;

        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor() {
            super();
            this.start();
        }

        // Add game objects to my scene in this method
        public start(): void {
            stage.addChild(this);
        }

        // update game objects in my scene
        public update(): void {

        }

        // Setup Background
        protected _setupBackground(background: string): void {
            this._background = new createjs.Bitmap(assets.getResult(background));
            this.addChild(this._background);
        }

        // FadeIn method
        protected _fadeIn(transitionTime: number): void {
            createjs.Tween.get(this._background).to({ alpha: 0 }, transitionTime,
                createjs.Ease.getPowInOut(2));
        }

        // FadeOut method
        protected _fadeOut(transitionTime: number, callback: any): void {
            createjs.Tween.get(this._background).to({ alpha: 0 }, transitionTime,
                createjs.Ease.getPowInOut(2)).call(callback);
        }
    }
}