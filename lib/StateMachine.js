/**
 * States are only created as needed, to save memory, reduce clean-up bugs and
 * increase speed due to garbage collection taking longer with more data in memory.
 *
 * States are added with a string identifier and a State object.
 *
 * const stateMachine = new StateMachine();
 *
 * stateMachine.add('main-menu', new MainMenuState());
 * stateMachine.add('play', new PlayState());
 * stateMachine.add('game-over', new GameOverState());
 *
 * stateMachine.change('MainMenuState', {});
 *
 * Arguments passed into the change() function after the state name will
 * be forwarded to the enter() function of the state being changed to.
 *
 * State identifiers should be the lower-case kebab-case version of
 * the state object without the 'State' suffix.
 * ex. 'main-menu' identifies a state object of type MainMenuState.
 */
export default class StateMachine {
	constructor() {
		this.states = {};
	}

	add(stateName, state) {
		state.name = stateName;
		this.states[stateName] = state;
		this.currentState = state;
	}

	async change(stateName, enterParameters) {
		this.currentState.exit();
		this.currentState = this.states[stateName];
		await this.currentState.enter(enterParameters);
	}

	async update(dt) {
		await this.currentState.update(dt);
	}

	render(context) {
		this.currentState.render(context);
	}

	toJSON() {
		let statesProperty = {};

		let objectKeys = Object.keys(this.states)

		for (let i = 0; i < objectKeys.length; i++) {
			statesProperty[objectKeys[i]] = this.states[objectKeys[i]].toJSON();
			
		}	

		return {
			states: statesProperty,
			currentState: this.currentState.toJSON(),
			currentStateName: this.currentState.name,
			className: this.constructor.name
		};
	}
}
