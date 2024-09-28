import { ChildProperty, Property } from '@hoyui/base';
import { IndicatorType } from '@hoyui/grids';

/**
 * Configures the Loading Indicator of the Gantt.
 */
export class LoadingIndicator extends ChildProperty<LoadingIndicator> {
    /**
     * Defines the loading indicator. The available loading indicator are:
     * * Spinner
     * * Shimmer
     *
     * @default Syncfusion.EJ2.Grids.IndicatorType.Spinner
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.IndicatorType
     *
     */
    @Property('Spinner')
    public indicatorType: IndicatorType;
}
