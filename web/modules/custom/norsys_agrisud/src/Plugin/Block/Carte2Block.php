<?php
namespace Drupal\norsys_agrisud\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\Annotation\Block;

/**
 * @block (id="carte", admin_label="carte2")
 *
 */
class Carte2Block extends BlockBase {

  /**
   * {@inheritDoc}
   * @return array|void
   */
  public function build() {
    // TODO: Implement build() method.
    return [
      '#type' => 'markup',
      '#markup' => 'this is a custom block' .
        '<object type="image/svg+xml" data="carte.svg">
	          <image src="carte.svg" />
        </object>',
      '#body' => '<object type="image/svg+xml" data="carte.svg">
	          <image src="carte.svg" />
        </object>'
    ];
  }

}