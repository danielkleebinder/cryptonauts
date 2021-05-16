export interface Item {

  /**
   * Unique item identifier.
   */
  id: number;

  /**
   * The name of the item (should be unique as well, but is no constraint).
   */
  name: string;

  /**
   * The items level. Improving typically makes the much stronger, thats why this
   * field should have an upper bound.
   */
  level: number;

  /**
   * The mining factor which indicates how much this item improves mining speed.
   */
  mining: number;

  /**
   * The attack factor which indicates how much this item improves offensive damage.
   */
  attack: number;

  /**
   * Depending on the type (being a template or a purchased item owned by a player),
   * this field either indicates the initial purchase cost or the upgrade cost.
   */
  defense: number;

  /**
   * Players can destroy item. They are no longer available if they got destroyed.
   */
  cost: number;

  /**
   * Players can destroy item. They are no longer available if they got destroyed.
   */
  destroyed: boolean;

  /**
   * Indicates if this item is currently equipped by the player.
   */
  equipped: boolean;
}
