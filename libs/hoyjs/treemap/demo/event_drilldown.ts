import { TreeMap } from '../src/treemap/treemap';
import { TreeMapTooltip } from '../src/treemap/user-interaction/tooltip';
import { DrillDown } from '../demo/Data/Drilldown_Sample';
import { EmitType } from '@hoyui/base';
import { IDrillStartEventArgs } from '../src/treemap/model/interface';
import { IItemRenderingEventArgs } from '../src/treemap/model/interface';
TreeMap.Inject(TreeMapTooltip);

/**
 * Default sample
 */

let prevTime: Date;
let curTime: Date;
let drilldown: EmitType<IDrillStartEventArgs> = (
  args: IDrillStartEventArgs
) => {
  args.treemap.levels[2].showHeader = true;
};

let treemap: TreeMap = new TreeMap({
  /* drillStart: (args: IDrillStartEventArgs) => {
         if (args.item[Object.keys(args.item)[0]].length === 1) {
             args.treemap.levels[2].showHeader = true;
         } else {
             args.treemap.levels[2].showHeader = false;
         }
     },
     tooltipRendering: (args: ITreeMapTooltipRenderEventArgs) => {
         //tslint:disable-next-line
         if (args.item['groupIndex'] !== 2 ) {
             args.cancel = true;
         }
     },*/
  //load: treemapload,
  palette: ['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66'],
  titleSettings: {
    text: 'List of countries by population',
    textStyle: { size: '15px' },
  },
  enableDrillDown: true,
  format: 'n',
  useGroupingSeparator: true,
  dataSource: DrillDown,
  weightValuePath: 'Population',
  tooltipSettings: {
    //  visible: true,
    format: '${Name} : ${Population}',
  },
  leafItemSettings: {
    labelPath: 'Name',
    showLabels: false,
    labelStyle: { size: '0px' },
    border: { color: 'black', width: 0.5 },
  },
  levels: [
    { groupPath: 'Continent', border: { color: 'black', width: 0.5 } },
    { groupPath: 'States', border: { color: 'black', width: 0.5 } },
    {
      groupPath: 'Region',
      showHeader: false,
      border: { color: 'black', width: 0.5 },
    },
  ],
  drillStart: drilldown,
});
treemap.appendTo('#container');
document.getElementById('fill').onclick = () => {
  treemap.levels[0].fill = '#336699';
  treemap.levels[1].fill = '#336699';
  treemap.levels[2].fill = '#336699';
  treemap.refresh();
};
