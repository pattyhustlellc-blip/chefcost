// @version 2.2 - Phase 1 redesign: Windows 11 light theme
/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, createContext, useContext } from "react";
// @ts-ignore
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://zzquivyrvttdjusafvgn.supabase.co";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || "sb_publishable_wRUWzTFYMBVskBHmNP3MBw_-3po6dXb";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOGO_URL = "https://i.ibb.co/848yS9KQ/CC-removebg-preview.png";
const ICON_URL = "https://i.ibb.co/4RDLtvDb/Small-CC.png";
const ACCENT  = "#C8312B";
const ACCENT2 = "#A8261F";
const BG      = "#F3F3F3";
const SURF    = "#FFFFFF";
const SURF2   = "#F9F9F9";
const BDR     = "#E5E5E5";
const TEXT    = "#1B1B1B";
const TEXT2   = "#5F5F5F";
const WARN_BG = "#FFF4CE";
const WARN_BDR= "#F1E2A9";
const WARN_ICO= "#9D5D00";
const FC_OK   = "#0F7B0F";
const FC_WARN = "#9D5D00";
const FC_ERR  = "#C42B1C";
const MOBILE_BP = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BP);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < MOBILE_BP);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}
const UNITS_ES = ["lb","oz","kg","g","L","ml","fl oz","gal","qt","taza","tbsp","tsp","ct","docena","caja","bolsa","manojo","lata","botella","bloque","case"];
const UNITS_EN = ["lb","oz","kg","g","L","ml","fl oz","gal","qt","cup","tbsp","tsp","ct","dozen","box","bag","bunch","can","bottle","block","case"];
const UNITS = UNITS_ES;
function getUnits(lang){ return lang==="en"?UNITS_EN:UNITS_ES; }
function translateUnit(unit, toLang){
  if(!unit) return unit;
  if(toLang==="en"){const i=UNITS_ES.indexOf(unit);return i>=0?UNITS_EN[i]:unit;}
  else{const i=UNITS_EN.indexOf(unit);return i>=0?UNITS_ES[i]:unit;}
}
const ROLE_COLORS = { admin: ACCENT, chef: "#EF9F27", employee: "#378ADD" };

// ─── UI TRANSLATIONS ─────────────────────────────────────────────────────────
const UI = {
  // Generic actions
  edit:{es:"Editar",en:"Edit"}, delete:{es:"Eliminar",en:"Delete"}, add:{es:"Agregar",en:"Add"},
  save:{es:"Guardar",en:"Save"}, cancel:{es:"Cancelar",en:"Cancel"}, close:{es:"Cerrar",en:"Close"},
  search:{es:"Buscar...",en:"Search..."}, actions:{es:"Acciones",en:"Actions"}, all:{es:"Todas las categorías",en:"All categories"},
  yes:{es:"Sí",en:"Yes"}, no:{es:"No",en:"No"}, confirm:{es:"Confirmar",en:"Confirm"},
  // Dashboard
  ingredientsRegistered:{es:"registrados",en:"registered"}, activeRecipes:{es:"Recetas activas",en:"Active recipes"},
  inMenu:{es:"en menú",en:"in menu"}, avgCost:{es:"Costo promedio",en:"Average cost"}, perPortion:{es:"por porción",en:"per portion"},
  priceAlerts:{es:"Alertas precio",en:"Price alerts"}, roseThisWeek:{es:"subieron esta semana",en:"rose this week"},
  priceVariation:{es:"Variación de precios",en:"Price variation"}, ingredient:{es:"Ingrediente",en:"Ingredient"},
  previous:{es:"Anterior",en:"Previous"}, current:{es:"Actual",en:"Current"}, variation:{es:"Var.",en:"Var."},
  recipesByMargin:{es:"Recetas por margen",en:"Recipes by margin"}, dish:{es:"Plato",en:"Dish"},
  costPerPortion:{es:"Costo/porc.",en:"Cost/portion"}, sellPrice:{es:"P.Venta",en:"Sell price"}, margin:{es:"Margen",en:"Margin"},
  criticalStock:{es:"Stock crítico",en:"Critical stock"}, totalIngredients:{es:"Ingredientes",en:"Ingredients"},
  // Ingredients
  total:{es:"Total",en:"Total"}, pricesRose:{es:"Subieron precio",en:"Prices rose"}, suppliers:{es:"Proveedores",en:"Suppliers"},
  allSuppliers:{es:"Todos los proveedores",en:"All suppliers"}, name:{es:"Nombre",en:"Name"}, supplier:{es:"Proveedor",en:"Supplier"},
  unitPurchase:{es:"U.Compra",en:"Buy unit"}, unitUse:{es:"U.Uso",en:"Use unit"}, unitInventory:{es:"U.Inv",en:"Stock unit"},
  price:{es:"Precio",en:"Price"}, stock:{es:"Stock",en:"Stock"}, category:{es:"Categoría",en:"Category"},
  newIngredient:{es:"Nuevo ingrediente",en:"New ingredient"}, editIngredient:{es:"Editar ingrediente",en:"Edit ingredient"},
  currentPrice:{es:"Precio actual",en:"Current price"}, prevPrice:{es:"Precio anterior",en:"Previous price"},
  unitsPerPack:{es:"Contenido del empaque",en:"Package contents"}, currentStock:{es:"Stock actual",en:"Current stock"},
  minStock:{es:"Stock mínimo (alerta)",en:"Min stock (alert)"},
  costPerUnit:{es:"Costo por unidad",en:"Cost per unit"},
  // Recipes
  newRecipe:{es:"Nueva receta",en:"New recipe"}, editRecipe:{es:"Editar receta",en:"Edit recipe"},
  bestMargin:{es:"Mejor margen",en:"Best margin"}, worstMargin:{es:"Margen más bajo",en:"Lowest margin"},
  sortAZ:{es:"A-Z",en:"A-Z"}, sortMarginBest:{es:"Mejor margen primero",en:"Best margin first"}, sortCostHigh:{es:"Mayor costo primero",en:"Highest cost first"},
  portions:{es:"Porciones",en:"Portions"}, size:{es:"Tamaño",en:"Size"}, waste:{es:"Merma",en:"Waste"},
  cost:{es:"Costo",en:"Cost"}, costWaste:{es:"C/merma",en:"Cost w/waste"}, allergensCol:{es:"Alérgenos",en:"Allergens"},
  nameEs:{es:"Nombre (Español)",en:"Name (Spanish)"}, nameEn:{es:"Nombre (English)",en:"Name (English)"}, optional:{es:"opcional",en:"optional"},
  portionSize:{es:"Tamaño/porción",en:"Portion size"}, wastePct:{es:"% Merma",en:"% Waste"}, batch:{es:"Batch",en:"Batch"},
  newCat:{es:"Nueva",en:"New"}, catName:{es:"Nombre categoría",en:"Category name"},
  prepTime:{es:"Tiempo de prep",en:"Prep time"}, cookTime:{es:"Tiempo de cocción",en:"Cook time"}, shelfLife:{es:"Vida útil",en:"Shelf life"},
  tabIngredients:{es:"Ingredientes",en:"Ingredients"}, tabSteps:{es:"Paso a paso",en:"Steps"}, tabAllergens:{es:"Alérgenos",en:"Allergens"},
  addIngredient:{es:"Agregar",en:"Add"}, selectIngredient:{es:"— Seleccionar —",en:"— Select —"}, quantity:{es:"Cantidad",en:"Quantity"}, unit:{es:"Unidad",en:"Unit"},
  costSummary:{es:"Resumen de costos",en:"Cost summary"}, ingredientsCost:{es:"Costo ingredientes",en:"Ingredients cost"},
  total2:{es:"Total",en:"Total"}, byPortion:{es:"Por porción",en:"Per portion"},
  priceToMargin:{es:"Precio → Margen",en:"Price → Margin"}, marginToPrice:{es:"Margen → Precio",en:"Margin → Price"},
  sellingPrice:{es:"Precio de venta ($)",en:"Selling price ($)"}, targetMargin:{es:"Margen deseado (%)",en:"Target margin (%)"}, suggestedPrice:{es:"Precio sugerido",en:"Suggested price"},
  addStep:{es:"Agregar paso",en:"Add step"}, noStepsYet:{es:"Sin pasos en esta etapa todavía.",en:"No steps in this stage yet."},
  stepEsPlaceholder:{es:"Paso en español...",en:"Step in Spanish..."}, stepEnPlaceholder:{es:"Step in English (optional)...",en:"Paso en inglés (opcional)..."},
  selectAllergens:{es:"Selecciona los alérgenos presentes en esta receta.",en:"Select the allergens present in this recipe."},
  contains:{es:"Contiene",en:"Contains"}, saveRecipe:{es:"Guardar receta",en:"Save recipe"}, downloadPdf:{es:"Descargar PDF",en:"Download PDF"},
  // Invoices
  dropHere:{es:"Arrastra tu factura aquí",en:"Drag your invoice here"}, photoOrPdf:{es:"Foto (JPG, PNG) o PDF",en:"Photo (JPG, PNG) or PDF"},
  analyzeAI:{es:"Analizar con IA",en:"Analyze with AI"}, reviewItems:{es:"Revisar",en:"Review"}, items:{es:"ítems",en:"items"},
  willBeAdded:{es:"Los ingredientes confirmados se agregarán a tu base de datos automáticamente.",en:"Confirmed ingredients will be added to your database automatically."},
  qty:{es:"Cant.",en:"Qty"}, unitPrice:{es:"P.Unit",en:"Unit price"}, action:{es:"Acción",en:"Action"}, grouped:{es:"AGRUPADO",en:"GROUPED"},
  confirmSave:{es:"Confirmar y guardar",en:"Confirm and save"}, savedInvoice:{es:"¡Factura guardada!",en:"Invoice saved!"},
  ingredientsUpdated:{es:"Los ingredientes se actualizaron automáticamente.",en:"Ingredients were updated automatically."},
  uploadAnother:{es:"Subir otra factura",en:"Upload another invoice"}, previousInvoices:{es:"Facturas anteriores",en:"Previous invoices"},
  date:{es:"Fecha",en:"Date"}, totalCol:{es:"Total",en:"Total"},
  // Inventory
  lastCountSaved:{es:"Último conteo guardado.",en:"Last count saved."}, noInventoryYet:{es:"Sin inventario registrado.",en:"No inventory recorded yet."},
  startCount:{es:"Iniciar conteo",en:"Start count"}, countInProgress:{es:"Conteo en curso",en:"Count in progress"},
  totalValue:{es:"Valor total",en:"Total value"}, counted:{es:"Contados",en:"Counted"}, outOfStock:{es:"Agotados",en:"Out of stock"},
  newCount:{es:"Nuevo conteo",en:"New count"}, sealedPacks:{es:"📦 Empaques cerrados",en:"📦 Sealed packs"}, loosePacks:{es:"🔓 Sueltas",en:"🔓 Loose units"},
  valueCol:{es:"Valor",en:"Value"}, startFirstCount:{es:"Iniciar primer conteo",en:"Start first count"},
  // Shopping
  totalItems:{es:"Total ítems",en:"Total items"}, pending:{es:"Pendientes",en:"Pending"}, alreadyBought:{es:"Ya comprado",en:"Already bought"},
  totalEst:{es:"Total est.",en:"Est. total"}, addItem:{es:"Agregar ítem",en:"Add item"}, regenerate:{es:"Regenerar",en:"Regenerate"},
  clearBought:{es:"Limpiar comprados",en:"Clear bought"}, note:{es:"Nota",en:"Note"}, optionalNote:{es:"opcional",en:"optional"},
  addToList:{es:"Agregar a la lista",en:"Add to list"}, lowStock:{es:"⚡ Stock bajo",en:"⚡ Low stock"},
  bought:{es:"comprados",en:"bought"}, subtotal:{es:"Subtotal",en:"Subtotal"}, estTotal:{es:"Total estimado",en:"Estimated total"},
  // Settings
  myAccount:{es:"Mi cuenta",en:"My account"}, users:{es:"Usuarios",en:"Users"}, signOut:{es:"Cerrar sesión",en:"Sign out"},
  newUser:{es:"Nuevo usuario",en:"New user"}, editUser:{es:"Editar usuario",en:"Edit user"}, email:{es:"Correo",en:"Email"},
  newPassword:{es:"Nueva contraseña",en:"New password"}, password:{es:"Contraseña",en:"Password"}, role:{es:"Rol",en:"Role"},
  modulePerms:{es:"Permisos por módulo",en:"Module permissions"}, noAccess:{es:"Sin acceso",en:"No access"},
  viewOnly:{es:"Solo ver",en:"View only"}, viewEdit:{es:"Ver y editar",en:"View & edit"}, adminFullAccess:{es:"Los administradores tienen acceso completo.",en:"Admins have full access."},
};
function t(key, lang) { return (UI[key] && UI[key][lang]) || (UI[key] && UI[key].es) || key; }


const CAT_ING = [
  { id:"carnes",      label:"Carnes & Proteínas", label_en:"Meat & Protein",     color:"#E24B4A" },
  { id:"lacteos",     label:"Lácteos",             label_en:"Dairy",              color:"#378ADD" },
  { id:"vegetales",   label:"Vegetales & Frutas",  label_en:"Vegetables & Fruit", color:ACCENT    },
  { id:"panaderia",   label:"Panadería & Granos",  label_en:"Bakery & Grains",    color:"#EF9F27" },
  { id:"condimentos", label:"Condimentos & Salsas",label_en:"Condiments & Sauces",color:"#C084FC" },
  { id:"aceites",     label:"Aceites & Líquidos",  label_en:"Oils & Liquids",     color:"#38BDF8" },
  { id:"otros",       label:"Otros",               label_en:"Other",              color:TEXT2     },
];

const DEFAULT_RECIPE_CATS = [];

const INIT_USERS = [
  { id:1, name:"Chef Owner",   email:"admin@chefcost.app",  password:"admin123",  role:"admin",    avatar:"CO",
    permissions:{ dashboard:"edit",ingredients:"edit",recipes:"edit",invoices:"edit",inventory:"edit",shopping:"edit",settings:"edit" } },
  { id:2, name:"Carlos López", email:"carlos@chefcost.app", password:"carlos123", role:"chef",     avatar:"CL",
    permissions:{ dashboard:"view",ingredients:"edit",recipes:"edit",invoices:"view",inventory:"view",shopping:"view",settings:null } },
  { id:3, name:"María Gómez",  email:"maria@chefcost.app",  password:"maria123",  role:"employee", avatar:"MG",
    permissions:{ dashboard:"view",ingredients:"view",recipes:"view",invoices:null,inventory:"edit",shopping:"edit",settings:null } },
];

const INIT_INGREDIENTS = [
  { id:1,  name:"Carne molida",   category:"carnes",      supplier:"Restaurant Depot", unit_purchase:"lb",    unit_use:"oz",    unit_inventory:"lb",    price:4.99,  prev_price:4.50, pack_size:null, stock:12,   min_stock:10 },
  { id:2,  name:"Pollo",          category:"carnes",      supplier:"Restaurant Depot", unit_purchase:"lb",    unit_use:"oz",    unit_inventory:"lb",    price:2.57,  prev_price:2.40, pack_size:null, stock:9.23, min_stock:10 },
  { id:3,  name:"Queso cheddar",  category:"lacteos",     supplier:"Sysco",            unit_purchase:"lb",    unit_use:"oz",    unit_inventory:"lb",    price:3.50,  prev_price:3.80, pack_size:null, stock:2,    min_stock:5 },
  { id:4,  name:"Crema ácida",    category:"lacteos",     supplier:"Sysco",            unit_purchase:"lb",    unit_use:"oz",    unit_inventory:"lb",    price:2.10,  prev_price:2.10, pack_size:null, stock:1,    min_stock:3 },
  { id:5,  name:"Lechuga romana", category:"vegetales",   supplier:"Farmer's Market",  unit_purchase:"bolsa", unit_use:"ct",    unit_inventory:"ct",    price:1.25,  prev_price:1.10, pack_size:3,    stock:4,    min_stock:5 },
  { id:6,  name:"Aguacate",       category:"vegetales",   supplier:"Farmer's Market",  unit_purchase:"ct",    unit_use:"ct",    unit_inventory:"ct",    price:1.10,  prev_price:0.85, pack_size:null, stock:3,    min_stock:10 },
  { id:7,  name:"Cilantro",       category:"vegetales",   supplier:"Farmer's Market",  unit_purchase:"manojo",unit_use:"manojo",unit_inventory:"manojo", price:0.75,  prev_price:0.80, pack_size:null, stock:5,    min_stock:5 },
  { id:8,  name:"Tomate",         category:"vegetales",   supplier:"Farmer's Market",  unit_purchase:"lb",    unit_use:"oz",    unit_inventory:"lb",    price:1.30,  prev_price:1.30, pack_size:null, stock:6,    min_stock:8 },
  { id:9,  name:"Pan HD Roll",    category:"panaderia",   supplier:"Local Bakery",     unit_purchase:"bolsa", unit_use:"ct",    unit_inventory:"ct",    price:3.99,  prev_price:3.50, pack_size:8,    stock:18,   min_stock:16 },
  { id:10, name:'Tortilla 8"',    category:"panaderia",   supplier:"Local Bakery",     unit_purchase:"bolsa", unit_use:"ct",    unit_inventory:"ct",    price:5.40,  prev_price:5.40, pack_size:30,   stock:72,   min_stock:60 },
  { id:11, name:"Chile jalapeño", category:"condimentos", supplier:"Farmer's Market",  unit_purchase:"ct",    unit_use:"ct",    unit_inventory:"ct",    price:0.35,  prev_price:0.30, pack_size:null, stock:5,    min_stock:10 },
  { id:12, name:"Aceite vegetal", category:"aceites",     supplier:"Restaurant Depot", unit_purchase:"gal",   unit_use:"tbsp",  unit_inventory:"gal",   price:8.99,  prev_price:8.50, pack_size:null, stock:2,    min_stock:3 },
];

const INIT_RECIPES = [
  { id:1, name:"Tacos de Carne",      category:"tacos",       portions:3, portion_size:4,  portion_unit:"oz", waste_pct:8,  selling_price:12.00,
    ingredients:[{ing_id:1,qty:6,unit:"oz"},{ing_id:9,qty:3,unit:"ct"},{ing_id:3,qty:1.5,unit:"oz"},{ing_id:5,qty:0.5,unit:"ct"},{ing_id:8,qty:1,unit:"oz"}] },
  { id:2, name:"Quesadilla de Pollo", category:"quesadillas", portions:1, portion_size:1,  portion_unit:"ct", waste_pct:5,  selling_price:9.50,
    ingredients:[{ing_id:2,qty:4,unit:"oz"},{ing_id:10,qty:2,unit:"ct"},{ing_id:3,qty:2,unit:"oz"},{ing_id:4,qty:1,unit:"oz"}] },
  { id:3, name:"Burrito Especial",    category:"burritos",    portions:1, portion_size:12, portion_unit:"oz", waste_pct:10, selling_price:13.00,
    ingredients:[{ing_id:1,qty:5,unit:"oz"},{ing_id:10,qty:1,unit:"ct"},{ing_id:3,qty:2,unit:"oz"},{ing_id:6,qty:0.5,unit:"ct"}] },
  { id:4, name:"Guacamole",           category:"sides",       portions:4, portion_size:4,  portion_unit:"oz", waste_pct:15, selling_price:4.00,
    ingredients:[{ing_id:6,qty:2,unit:"ct"},{ing_id:7,qty:0.2,unit:"manojo"},{ing_id:8,qty:2,unit:"oz"},{ing_id:11,qty:1,unit:"ct"}] },
];

const INIT_INVOICES = [
  { id:1, date:"2026-05-28", supplier:"Restaurant Depot", items:6, total:"$142.30" },
  { id:2, date:"2026-06-01", supplier:"Sysco",            items:4, total:"$89.50"  },
];

const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

// ─── TOAST SYSTEM ────────────────────────────────────────────────────────────
const ToastCtx = createContext(null);
const useToast = () => useContext(ToastCtx);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  function showToast(msg, type="success") {
    const id = Date.now();
    setToasts(p=>[...p, {id, msg, type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)), 3000);
  }
  const colors = { success:{bg:SURF,border:FC_OK,icon:"ti-check",color:FC_OK}, error:{bg:SURF,border:FC_ERR,icon:"ti-x",color:FC_ERR}, info:{bg:SURF,border:"#378ADD",icon:"ti-info-circle",color:"#378ADD"} };
  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none",width:"90%",maxWidth:340}}>
        {toasts.map(t=>{
          const c=colors[t.type]||colors.success;
          return (
            <div key={t.id} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,width:"100%",boxShadow:"0 4px 20px rgba(0,0,0,0.12)",animation:"slideUp 0.3s ease"}}>
              <i className={`ti ${c.icon}`} style={{fontSize:16,color:c.color,flexShrink:0}}/>
              <span style={{fontSize:13,color:TEXT,fontWeight:500}}>{t.msg}</span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </ToastCtx.Provider>
  );
}

// ─── helpers ───────────────────────────────────────────────────────────────
function priceDiff(cur, prev) {
  if (!prev || prev === cur) return { pct:0, up:false, same:true };
  const pct = ((cur - prev) / prev) * 100;
  return { pct: Math.abs(pct).toFixed(1), up: pct > 0, same: false };
}

// ─── UNIT CONVERSION TABLE ───────────────────────────────────────────────────
// All units converted to a common base (grams for weight, ml for volume)
const UNIT_TO_BASE = {
  // Weight → grams
  "g":      1,
  "kg":     1000,
  "oz":     28.3495,
  "lb":     453.592,
  // Volume → ml
  "ml":     1,
  "L":      1000,
  "fl oz":  29.5735,
  "qt":     946.353,
  "gal":    3785.41,
  "taza":   236.588,
  "cup":    236.588,
  "tbsp":   14.7868,
  "tsp":    4.92892,
};
const WEIGHT_UNITS = new Set(["g","kg","oz","lb"]);
const VOLUME_UNITS = new Set(["ml","L","fl oz","qt","gal","taza","cup","tbsp","tsp"]);

function convertUnits(qty, fromUnit, toUnit) {
  if (!fromUnit || !toUnit || fromUnit === toUnit) return qty;
  const fromBase = UNIT_TO_BASE[fromUnit];
  const toBase   = UNIT_TO_BASE[toUnit];
  if (!fromBase || !toBase) return qty; // Can't convert (count units like ct, case, etc.)
  // Both must be in the same category (weight or volume)
  const fromIsWeight = WEIGHT_UNITS.has(fromUnit);
  const toIsWeight   = WEIGHT_UNITS.has(toUnit);
  if (fromIsWeight !== toIsWeight) return qty; // Can't convert weight to volume
  return qty * (fromBase / toBase);
}

function getCostPerGram(ing) {
  const price = parseFloat(ing.price) || 0;
  const packSize = parseFloat(ing.pack_size) || 0;
  const unitUse = ing.unit_use;
  const unitPurchase = ing.unit_purchase;
  if (packSize > 0) {
    const basePerUse = UNIT_TO_BASE[unitUse] || 0;
    if (basePerUse <= 0) return price / packSize;
    return price / (packSize * basePerUse);
  }
  const basePerPurchase = UNIT_TO_BASE[unitPurchase] || 0;
  if (basePerPurchase <= 0) return price;
  return price / basePerPurchase;
}

function getCostPerBaseUnit(ing) {
  const price = parseFloat(ing.price) || 0;
  const packSize = parseFloat(ing.pack_size) || 0;
  const unitPurchase = ing.unit_purchase;
  const unitUse = ing.unit_use;
  if (packSize > 0) return price / packSize;
  if (unitPurchase === unitUse) return price;
  const converted = convertUnits(1, unitPurchase, unitUse);
  if (converted !== 1) return price / converted;
  return price;
}

function calcRecipe(recipe, ings, allRecipes=[]) {
  const raw = recipe.ingredients.reduce((s, ri) => {
    const recipeQty = parseFloat(ri.qty) || 0;
    const recipeUnit = ri.unit && ri.unit.trim() ? ri.unit : "";

    if (ri.type === "prep" && ri.prep_id) {
      const prepRecipe = allRecipes.find(r => r.id === ri.prep_id);
      if (!prepRecipe) return s;
      const prepCost = calcRecipe(prepRecipe, ings, allRecipes);
      const yieldAmt = parseFloat(prepRecipe.total_yield) || parseFloat(prepRecipe.portions) || 1;
      const yieldUnit = prepRecipe.yield_unit || prepRecipe.portion_unit || "L";
      const costPerYieldUnit = prepCost.total / yieldAmt;
      const recipeBase = UNIT_TO_BASE[recipeUnit] || 0;
      const yieldBase = UNIT_TO_BASE[yieldUnit] || 0;
      const effectiveQty = (recipeBase > 0 && yieldBase > 0) ? recipeQty * (recipeBase / yieldBase) : recipeQty;
      return s + effectiveQty * costPerYieldUnit;
    }

    const ing = ings.find(i => i.id === ri.ing_id);
    if (!ing) return s;

    const ingUnitUse = ing.unit_use;
    const recipeUnitBase = UNIT_TO_BASE[recipeUnit] || 0;
    const ingUnitBase = UNIT_TO_BASE[ingUnitUse] || 0;

    // If both units are convertible (weight↔weight or volume↔volume)
    if (recipeUnitBase > 0 && ingUnitBase > 0) {
      // Check same category
      const recipeIsWeight = WEIGHT_UNITS.has(recipeUnit);
      const ingIsWeight = WEIGHT_UNITS.has(ingUnitUse);
      if (recipeIsWeight === ingIsWeight) {
        // Convert via base: qty in recipe unit → grams/ml → ing unit
        const qtyInBase = recipeQty * recipeUnitBase;
        const qtyInIngUnit = qtyInBase / ingUnitBase;
        return s + qtyInIngUnit * getCostPerBaseUnit(ing);
      }
    }

    // Count units or cross-category: use direct cost per unit_use
    const qtyInIngUnit = convertUnits(recipeQty, recipeUnit, ingUnitUse);
    return s + qtyInIngUnit * getCostPerBaseUnit(ing);
  }, 0);
  const waste  = raw * (parseFloat(recipe.waste_pct) / 100);
  const total  = raw + waste;
  const cpp    = total / (parseFloat(recipe.portions) || 1);
  const margin = recipe.selling_price > 0 ? ((recipe.selling_price - cpp) / recipe.selling_price) * 100 : 0;
  return { raw, waste, total, cpp, margin };
}


function mColor(p) { return p >= 65 ? ACCENT : p >= 45 ? "#EF9F27" : "#E24B4A"; }
function mType(p)  { return p >= 65 ? "ok"   : p >= 45 ? "warn"    : "err";     }

// ─── shared styles ──────────────────────────────────────────────────────────
const g = {
  card:  { background:SURF,  border:`1px solid ${BDR}`, borderRadius:8, overflow:"hidden" },
  th:    { padding:"8px 12px", textAlign:"left", fontSize:10, fontWeight:600, color:TEXT2, borderBottom:`1px solid ${BDR}`, background:SURF2, letterSpacing:0.5, textTransform:"uppercase", whiteSpace:"nowrap" },
  td:    { padding:"9px 12px", color:TEXT, borderBottom:`1px solid ${BDR}`, verticalAlign:"middle", fontSize:12 },
  inp:   { background:"#FBFBFB", border:`1px solid ${BDR}`, borderBottom:`2px solid #8A8A8A`, borderRadius:4, padding:"8px 10px", color:TEXT, fontSize:13, outline:"none", width:"100%", fontFamily:"'Segoe UI Variable','Segoe UI',system-ui,sans-serif" },
  sel:   { background:"#FBFBFB", border:`1px solid ${BDR}`, borderBottom:`2px solid #8A8A8A`, borderRadius:4, padding:"8px 8px",  color:TEXT, fontSize:13, outline:"none", fontFamily:"'Segoe UI Variable','Segoe UI',system-ui,sans-serif" },
  btnP:  { background:ACCENT, color:"#fff", border:"none", borderRadius:5, padding:"9px 18px", fontSize:13, fontWeight:600, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6, minHeight:44 },
  btnS:  { background:"transparent", color:TEXT2, border:`1px solid ${BDR}`, borderRadius:5, padding:"9px 18px", fontSize:13, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6, minHeight:44 },
  btnI:  { background:SURF2, color:TEXT, border:`1px solid ${BDR}`, borderRadius:5, padding:"6px 12px", fontSize:12, fontWeight:500, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, minHeight:36 },
  btnD:  { background:"rgba(200,49,43,0.06)", color:ACCENT, border:`1px solid rgba(200,49,43,0.2)`, borderRadius:5, padding:"6px 12px", fontSize:12, fontWeight:500, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, minHeight:36 },
  badge: (t) => { const m={ok:{bg:"rgba(15,123,15,0.1)",c:FC_OK},warn:{bg:"rgba(157,93,0,0.1)",c:FC_WARN},err:{bg:"rgba(196,43,28,0.1)",c:FC_ERR},info:{bg:"rgba(55,138,221,0.1)",c:"#378ADD"},gray:{bg:SURF2,c:TEXT2}}; const v=m[t]||m.gray; return {display:"inline-flex",alignItems:"center",gap:4,background:v.bg,color:v.c,fontSize:10,padding:"2px 8px",borderRadius:99,fontWeight:600,whiteSpace:"nowrap"}; },
  catH:  (c) => ({ display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:`${c}11`,borderBottom:`1px solid ${BDR}`,fontSize:11,fontWeight:700,color:c,letterSpacing:0.5,textTransform:"uppercase" }),
  modal: { position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:window.innerWidth<768?"flex-end":"center",justifyContent:"center",zIndex:999,padding:window.innerWidth<768?0:16 },
  mbox:  { background:SURF,border:`1px solid ${BDR}`,borderRadius:window.innerWidth<768?"12px 12px 0 0":"10px",padding:window.innerWidth<768?20:24,width:window.innerWidth<768?"100%":560,maxWidth:"100vw",maxHeight:window.innerWidth<768?"92vh":"92vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:14,boxShadow:"0 8px 32px rgba(0,0,0,0.12)" },
  lbl:   { fontSize:12, color:TEXT2, fontWeight:500 },
  avt:   (c) => ({ width:34,height:34,borderRadius:"50%",background:`${c}18`,border:`1.5px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:c,flexShrink:0 }),
  pp:    (up,same) => ({ display:"inline-flex",alignItems:"center",gap:3,fontSize:10,padding:"2px 7px",borderRadius:99,fontWeight:600,background:same?SURF2:up?"rgba(196,43,28,0.08)":"rgba(15,123,15,0.08)",color:same?TEXT2:up?FC_ERR:FC_OK }),
};

const NAV = [
  { id:"dashboard",   icon:"ti-layout-dashboard", es:"Dashboard",        en:"Dashboard" },
  { id:"ingredients", icon:"ti-basket",            es:"Ingredientes",     en:"Ingredients" },
  { id:"recipes",     icon:"ti-book",              es:"Recetas",          en:"Recipes" },
  { id:"invoices",    icon:"ti-receipt",           es:"Facturas",         en:"Invoices" },
  { id:"inventory",   icon:"ti-box",               es:"Inventario",       en:"Inventory" },
  { id:"wastelog",    icon:"ti-trash",             es:"Desperdicio",      en:"Waste Log" },
  { id:"shopping",    icon:"ti-shopping-cart",     es:"Compras",          en:"Shopping" },
];

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function Login() {
  const { setUser, lang } = useApp();
  const [email, setEmail] = useState("");
  const [pwd,   setPwd]   = useState("");
  const [show,  setShow]  = useState(false);
  const [err,   setErr]   = useState("");
  const [load,  setLoad]  = useState(false);

  async function login() {
    setLoad(true);
    const { data, error } = await supabase
      .from("app_users")
      .select("*")
      .eq("email", email)
      .eq("password", pwd)
      .maybeSingle();
    if (error) {
      setErr(lang === "es" ? "Error al conectar. Intenta de nuevo." : "Connection error. Try again.");
      setLoad(false);
      return;
    }
    if (data) {
      setUser(data);
    } else {
      setErr(lang === "es" ? "Correo o contraseña incorrectos" : "Incorrect email or password");
      setLoad(false);
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:20 }}>

        <div style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <img src="/knives-logo.png" alt="ChefCost" style={{ width:120, height:120, objectFit:"contain", display:"block" }}/>
          <div style={{ fontSize:20, fontWeight:800, letterSpacing:1, color:TEXT }}>CHEFCOST</div>
          <div style={{ fontSize:10, fontWeight:600, letterSpacing:3, color:TEXT2, textTransform:"uppercase", marginTop:-6 }}>Food Cost Manager</div>
        </div>

        <div style={{ ...g.card, padding:24, display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>{lang==="es"?"Bienvenido a ChefCost":"Welcome to ChefCost"}</div>
            <div style={{ fontSize:12, color:TEXT2 }}>{lang==="es"?"Ingresa tus credenciales":"Enter your credentials"}</div>
          </div>

          {err && (
            <div style={{ background:"rgba(226,75,74,0.1)", border:"1px solid rgba(226,75,74,0.25)", borderRadius:8, padding:"9px 13px", fontSize:12, color:"#E24B4A" }}>
              <i className="ti ti-alert-circle" style={{ marginRight:6 }}/>{err}
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <label style={g.lbl}>{lang==="es"?"Correo":"Email"}</label>
            <input style={g.inp} type="email" placeholder="correo@ejemplo.com" value={email}
              onChange={e => { setEmail(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && login()} />
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <label style={g.lbl}>{lang==="es"?"Contraseña":"Password"}</label>
            <div style={{ position:"relative" }}>
              <input style={{ ...g.inp, paddingRight:40 }} type={show?"text":"password"} placeholder="••••••••" value={pwd}
                onChange={e => { setPwd(e.target.value); setErr(""); }}
                onKeyDown={e => e.key === "Enter" && login()} />
              <button style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:TEXT2, cursor:"pointer" }}
                onClick={() => setShow(v => !v)}>
                <i className={`ti ${show?"ti-eye-off":"ti-eye"}`}/>
              </button>
            </div>
          </div>

          <button style={{ ...g.btnP, width:"100%", justifyContent:"center", opacity:load?0.7:1 }} onClick={login} disabled={load}>
            {load
              ? <><i className="ti ti-loader-2" style={{ animation:"spin 0.8s linear infinite" }}/>{lang==="es"?"Verificando...":"Verifying..."}</>
              : <><i className="ti ti-login"/>{lang==="es"?"Ingresar":"Sign in"}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard() {
  const { ingredients, recipes, lang, pendingShopping, setPage, shoppingSubmitted, shoppingSubmittedBy } = useApp();
  const isMobile = useIsMobile();
  const calcs    = recipes.map(r => ({ ...r, ...calcRecipe(r, ingredients, recipes) }));
  const menuDishes = calcs.filter(r => !r.is_subrecipe);
  const priceUp  = ingredients.filter(i => i.price > i.prev_price);
  const critical = ingredients.filter(i => parseFloat(i.stock) <= (parseFloat(i.min_stock)||5));
  const avgCost  = menuDishes.length ? menuDishes.reduce((s,r)=>s+r.cpp,0)/menuDishes.length : 0;
  const topDish  = menuDishes.length ? [...menuDishes].sort((a,b)=>b.margin-a.margin)[0] : null;
  const sorted   = [...menuDishes].sort((a,b)=>b.margin-a.margin);

  // Food cost % = cost / sell price * 100
  const fcPct = topDish && topDish.selling_price > 0 ? (topDish.cpp / topDish.selling_price) * 100 : 0;
  const fcColor = fcPct <= 30 ? FC_OK : fcPct <= 40 ? FC_WARN : FC_ERR;
  const fcBarW  = Math.min(fcPct, 100);

  return (
    <div style={{ padding: isMobile?12:20, display:"flex", flexDirection:"column", gap:12 }}>

      {/* ── Alerts banner ── */}
      {priceUp.length > 0 && (
        <div style={{ background:WARN_BG, border:`1px solid ${WARN_BDR}`, borderRadius:10, padding:"11px 16px", display:"flex", alignItems:"center", gap:10 }}>
          <i className="ti ti-alert-triangle" style={{ fontSize:18, color:WARN_ICO, flexShrink:0 }}/>
          <div style={{ flex:1, fontSize:13, color:"#7A5000", fontWeight:600 }}>
            {lang==="en"
              ? `${priceUp.length} ingredient${priceUp.length>1?"s":""} rose in price this week`
              : `${priceUp.length} ingrediente${priceUp.length>1?"s":""} subieron de precio esta semana`}
            {priceUp.length <= 3 && (
              <span style={{ fontWeight:400, color:WARN_ICO }}>
                {" — "}{priceUp.map(i=>i.name).join(", ")}
              </span>
            )}
          </div>
        </div>
      )}
      {shoppingSubmitted && (
        <div style={{ background:"rgba(15,123,15,0.06)", border:`1px solid rgba(15,123,15,0.25)`, borderRadius:10, padding:"11px 16px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>setPage("shopping")}>
          <i className="ti ti-shopping-cart" style={{ fontSize:18, color:FC_OK, flexShrink:0 }}/>
          <div style={{ flex:1, fontSize:13, fontWeight:600, color:FC_OK }}>
            {lang==="en"?"Shopping list ready to buy!":"¡Lista de compras lista para comprar!"}
            <span style={{ fontWeight:400, color:TEXT2, marginLeft:6 }}>{lang==="en"?`by ${shoppingSubmittedBy}`:`por ${shoppingSubmittedBy}`}</span>
          </div>
          <i className="ti ti-chevron-right" style={{ fontSize:14, color:FC_OK }}/>
        </div>
      )}
      {!shoppingSubmitted && pendingShopping > 0 && (
        <div style={{ background:"rgba(239,159,39,0.06)", border:"1px solid rgba(239,159,39,0.3)", borderRadius:10, padding:"11px 16px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>setPage("shopping")}>
          <i className="ti ti-shopping-cart" style={{ fontSize:18, color:"#EF9F27", flexShrink:0 }}/>
          <div style={{ flex:1, fontSize:13, fontWeight:600, color:"#EF9F27" }}>
            {lang==="en"?"Shopping list pending":"Lista de compras pendiente"}
            <span style={{ fontWeight:400, color:TEXT2, marginLeft:6 }}>{lang==="en"?`${pendingShopping} item${pendingShopping>1?"s":""}`:`${pendingShopping} ítem${pendingShopping>1?"s":""}`}</span>
          </div>
          <i className="ti ti-chevron-right" style={{ fontSize:14, color:"#EF9F27" }}/>
        </div>
      )}

      {/* ── KPI row ── */}
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:8 }}>
        {[
          { icon:"ti-basket",       label:lang==="en"?"Ingredients":"Ingredientes",  value:ingredients.length,            sub:lang==="en"?"registered":"registrados",   color:TEXT },
          { icon:"ti-book",         label:lang==="en"?"Menu dishes":"Platos",        value:menuDishes.length,             sub:lang==="en"?"in menu":"en menú",           color:TEXT },
          { icon:"ti-currency-dollar", label:lang==="en"?"Avg cost":"Costo prom.",  value:`$${avgCost.toFixed(2)}`,      sub:lang==="en"?"per portion":"por porción",    color:"#EF9F27" },
          { icon:"ti-trending-up",  label:lang==="en"?"Price alerts":"Alertas",     value:priceUp.length,                sub:lang==="en"?"rose this week":"subieron",   color:priceUp.length>0?FC_ERR:FC_OK },
        ].map((s,i) => (
          <div key={i} style={{ background:SURF, border:`1px solid ${BDR}`, borderRadius:10, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
              <i className={`ti ${s.icon}`} style={{ fontSize:14, color:s.color }}/>
              <span style={{ fontSize:10, color:TEXT2, fontWeight:600, textTransform:"uppercase", letterSpacing:0.4 }}>{s.label}</span>
            </div>
            <div style={{ fontSize:24, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:10, color:TEXT2, marginTop:4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Hero card: top dish ── */}
      {topDish && (
        <div style={{ background:SURF, border:`1px solid ${BDR}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"10px 16px", borderBottom:`1px solid ${BDR}`, background:SURF2, display:"flex", alignItems:"center", gap:8 }}>
            <i className="ti ti-award" style={{ fontSize:15, color:ACCENT }}/>
            <span style={{ fontSize:12, fontWeight:700, color:TEXT, letterSpacing:0.3 }}>
              {lang==="en"?"TOP PERFORMER":"MEJOR PLATO"}
            </span>
            <span style={{ fontSize:10, color:TEXT2, marginLeft:4 }}>{lang==="en"?"highest margin this week":"mayor margen esta semana"}</span>
          </div>
          <div style={{ padding:16, display:"flex", flexDirection: isMobile?"column":"row", gap:16, alignItems: isMobile?"stretch":"center" }}>
            {/* Dish name + stats */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ fontSize:18, fontWeight:800, color:TEXT }}>{lang==="en"&&topDish.name_en?topDish.name_en:topDish.name}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                <div style={{ background:SURF2, border:`1px solid ${BDR}`, borderRadius:8, padding:"8px 14px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:TEXT2, marginBottom:2 }}>{lang==="en"?"Cost/portion":"Costo/porción"}</div>
                  <div style={{ fontSize:17, fontWeight:700, color:TEXT }}>${topDish.cpp.toFixed(2)}</div>
                </div>
                <div style={{ background:SURF2, border:`1px solid ${BDR}`, borderRadius:8, padding:"8px 14px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:TEXT2, marginBottom:2 }}>{lang==="en"?"Sell price":"Precio venta"}</div>
                  <div style={{ fontSize:17, fontWeight:700, color:TEXT }}>${parseFloat(topDish.selling_price).toFixed(2)}</div>
                </div>
                <div style={{ background:SURF2, border:`1px solid ${BDR}`, borderRadius:8, padding:"8px 14px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:TEXT2, marginBottom:2 }}>{lang==="en"?"Profit":"Ganancia"}</div>
                  <div style={{ fontSize:17, fontWeight:700, color:FC_OK }}>${(topDish.selling_price - topDish.cpp).toFixed(2)}</div>
                </div>
              </div>
            </div>
            {/* Food cost % gauge */}
            <div style={{ minWidth:180, display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <span style={{ fontSize:11, color:TEXT2, fontWeight:600 }}>{lang==="en"?"Food cost %":"% Costo alimento"}</span>
                <span style={{ fontSize:20, fontWeight:800, color:fcColor }}>{fcPct.toFixed(1)}%</span>
              </div>
              <div style={{ background:BDR, borderRadius:99, height:8, overflow:"hidden" }}>
                <div style={{ width:`${fcBarW}%`, height:"100%", background:fcColor, borderRadius:99, transition:"width 0.6s ease" }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:TEXT2 }}>
                <span>0%</span>
                <span style={{ color:FC_OK }}>≤30% ✓</span>
                <span>100%</span>
              </div>
              <div style={{ ...g.badge(fcPct<=30?"ok":fcPct<=40?"warn":"err"), alignSelf:"flex-start", fontSize:11, padding:"4px 10px" }}>
                {fcPct<=30
                  ? (lang==="en"?"Excellent":"Excelente")
                  : fcPct<=40
                  ? (lang==="en"?"Acceptable":"Aceptable")
                  : (lang==="en"?"High cost":"Costo alto")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Menu table ── */}
      <div style={{ background:SURF, border:`1px solid ${BDR}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"10px 16px", borderBottom:`1px solid ${BDR}`, background:SURF2, display:"flex", alignItems:"center", gap:8 }}>
          <i className="ti ti-chef-hat" style={{ fontSize:15, color:ACCENT }}/>
          <span style={{ fontSize:12, fontWeight:700, color:TEXT, letterSpacing:0.3 }}>
            {lang==="en"?"MENU — by margin":"MENÚ — por margen"}
          </span>
        </div>
        {isMobile ? (
          /* Mobile: stacked cards */
          <div style={{ display:"flex", flexDirection:"column" }}>
            {sorted.map((r, idx) => {
              const fc = r.selling_price > 0 ? (r.cpp / r.selling_price) * 100 : 0;
              return (
                <div key={r.id} style={{ padding:"12px 16px", borderBottom:`1px solid ${BDR}`, display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:`${ACCENT}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:ACCENT, flexShrink:0 }}>{idx+1}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{lang==="en"&&r.name_en?r.name_en:r.name}</div>
                    <div style={{ display:"flex", gap:10, marginTop:4, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, color:TEXT2 }}>{lang==="en"?"Cost":"Costo"}: <b style={{ color:TEXT }}>${r.cpp.toFixed(2)}</b></span>
                      <span style={{ fontSize:11, color:TEXT2 }}>{lang==="en"?"Price":"Precio"}: <b style={{ color:TEXT }}>${parseFloat(r.selling_price).toFixed(2)}</b></span>
                      <span style={{ fontSize:11, color:TEXT2 }}>FC: <b style={{ color:fc<=30?FC_OK:fc<=40?FC_WARN:FC_ERR }}>{fc.toFixed(1)}%</b></span>
                    </div>
                  </div>
                  <span style={{ ...g.badge(mType(r.margin)), fontSize:11, padding:"4px 8px" }}>{r.margin.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop: full table */
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead><tr>
              <th style={{ ...g.th, width:28 }}>#</th>
              <th style={g.th}>{lang==="en"?"Dish":"Plato"}</th>
              <th style={g.th}>{lang==="en"?"Cost/portion":"Costo/porción"}</th>
              <th style={g.th}>{lang==="en"?"Sell price":"Precio venta"}</th>
              <th style={g.th}>{lang==="en"?"Food cost %":"% Costo alim."}</th>
              <th style={g.th}>{lang==="en"?"Margin":"Margen"}</th>
            </tr></thead>
            <tbody>
              {sorted.map((r, idx) => {
                const fc = r.selling_price > 0 ? (r.cpp / r.selling_price) * 100 : 0;
                return (
                  <tr key={r.id} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ ...g.td, color:TEXT2, width:28, textAlign:"center" }}>{idx+1}</td>
                    <td style={{ ...g.td, fontWeight:600 }}>{lang==="en"&&r.name_en?r.name_en:r.name}</td>
                    <td style={{ ...g.td, color:TEXT2 }}>${r.cpp.toFixed(2)}</td>
                    <td style={g.td}>${parseFloat(r.selling_price).toFixed(2)}</td>
                    <td style={g.td}><span style={{ fontSize:12, fontWeight:600, color:fc<=30?FC_OK:fc<=40?FC_WARN:FC_ERR }}>{fc.toFixed(1)}%</span></td>
                    <td style={g.td}><span style={g.badge(mType(r.margin))}>{r.margin.toFixed(1)}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Price changes ── */}
      {priceUp.length > 0 && (
        <div style={{ background:SURF, border:`1px solid ${BDR}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"10px 16px", borderBottom:`1px solid ${BDR}`, background:SURF2, display:"flex", alignItems:"center", gap:8 }}>
            <i className="ti ti-trending-up" style={{ fontSize:15, color:ACCENT }}/>
            <span style={{ fontSize:12, fontWeight:700, color:TEXT, letterSpacing:0.3 }}>
              {lang==="en"?"RECENT PRICE CHANGES":"CAMBIOS DE PRECIO RECIENTES"}
            </span>
          </div>
          {isMobile ? (
            <div style={{ display:"flex", flexDirection:"column" }}>
              {ingredients.filter(i=>i.price!==i.prev_price).slice(0,6).map(ing => {
                const d = priceDiff(ing.price, ing.prev_price);
                return (
                  <div key={ing.id} style={{ padding:"11px 16px", borderBottom:`1px solid ${BDR}`, display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ing.name}</div>
                      <div style={{ fontSize:11, color:TEXT2, marginTop:2 }}><span style={{ textDecoration:"line-through" }}>${ing.prev_price.toFixed(2)}</span> → <b style={{ color:ACCENT }}>${ing.price.toFixed(2)}</b></div>
                    </div>
                    <span style={g.pp(d.up,d.same)}>{d.up?"+":"-"}{d.pct}%</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead><tr>
                <th style={g.th}>{lang==="en"?"Ingredient":"Ingrediente"}</th>
                <th style={g.th}>{lang==="en"?"Previous":"Anterior"}</th>
                <th style={g.th}>{lang==="en"?"Current":"Actual"}</th>
                <th style={g.th}>{lang==="en"?"Change":"Cambio"}</th>
              </tr></thead>
              <tbody>
                {ingredients.filter(i=>i.price!==i.prev_price).slice(0,6).map(ing => {
                  const d = priceDiff(ing.price, ing.prev_price);
                  return (
                    <tr key={ing.id} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={g.td}>{ing.name}</td>
                      <td style={{ ...g.td, color:TEXT2 }}>${ing.prev_price.toFixed(2)}</td>
                      <td style={{ ...g.td, fontWeight:600, color:ACCENT }}>${ing.price.toFixed(2)}</td>
                      <td style={g.td}><span style={g.pp(d.up,d.same)}>{d.up?"+":"-"}{d.pct}%</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

    </div>
  );
}

// ─── INGREDIENTS ─────────────────────────────────────────────────────────────
function Ingredients() {
  const { ingredients, setIngredients, lang } = useApp();
  const [search, setSrc] = useState("");
  const [fCat,   setFC]  = useState("all");
  const [fSup,   setFS]  = useState("all");
  const [edit,   setEd]  = useState(null);
  const [addNew, setAN]  = useState(false);
  const [showDups, setShowDups] = useState(false);
  const [dupGroups, setDupGroups] = useState([]);
  const [merging, setMerging] = useState(false);
  const suppliers = [...new Set(ingredients.map(i => i.supplier))];
  const filtered  = ingredients.filter(i =>
    (fCat==="all"||i.category===fCat) &&
    (fSup==="all"||i.supplier===fSup) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );
  const grouped = CAT_ING.map(c => ({ ...c, items: filtered.filter(i => i.category === c.id) })).filter(c => c.items.length > 0);

  // Similarity function using token overlap
  function similarity(a, b) {
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    const tokensA = new Set(normalize(a).split(/\s+/).filter(t => t.length > 2));
    const tokensB = new Set(normalize(b).split(/\s+/).filter(t => t.length > 2));
    if (tokensA.size === 0 || tokensB.size === 0) return 0;
    const intersection = [...tokensA].filter(t => tokensB.has(t)).length;
    const union = new Set([...tokensA, ...tokensB]).size;
    return intersection / union;
  }

  function detectDuplicates() {
    const groups = [];
    const used = new Set();
    for (let i = 0; i < ingredients.length; i++) {
      if (used.has(ingredients[i].id)) continue;
      const group = [ingredients[i]];
      for (let j = i + 1; j < ingredients.length; j++) {
        if (used.has(ingredients[j].id)) continue;
        if (similarity(ingredients[i].name, ingredients[j].name) >= 0.5) {
          group.push(ingredients[j]);
          used.add(ingredients[j].id);
        }
      }
      if (group.length > 1) {
        used.add(ingredients[i].id);
        groups.push(group.map(ing => ({ ...ing, keepName: false })));
      }
    }
    setDupGroups(groups.map(g => ({ items: g, keepId: g[0].id })));
    setShowDups(true);
  }

  async function mergeGroup(group) {
    const keeper = group.items.find(i => i.id === group.keepId);
    const others = group.items.filter(i => i.id !== group.keepId);
    if (!keeper) return;
    // Sum stocks and take most recent price
    const totalStock = group.items.reduce((s, i) => s + (parseFloat(i.stock) || 0), 0);
    const mostRecentPrice = group.items.reduce((best, i) => parseFloat(i.price) > parseFloat(best.price) ? i : best, keeper);
    // Update keeper with merged data
    const { error: updErr } = await supabase.from("ingredients").update({
      stock: totalStock,
      price: mostRecentPrice.price,
      prev_price: keeper.price,
    }).eq("id", keeper.id);
    if (updErr) { alert("Error fusionando: " + updErr.message); return; }
    // Delete duplicates
    for (const other of others) {
      await supabase.from("ingredients").delete().eq("id", other.id);
    }
    // Update local state
    setIngredients(prev => {
      const filtered = prev.filter(i => !others.find(o => o.id === i.id));
      return filtered.map(i => i.id === keeper.id ? { ...i, stock: totalStock, price: mostRecentPrice.price, prev_price: keeper.price } : i);
    });
    setDupGroups(prev => prev.filter(g => g.keepId !== group.keepId));
  }

  async function mergeAll() {
    setMerging(true);
    for (const group of dupGroups) {
      await mergeGroup(group);
    }
    setMerging(false);
    setShowDups(false);
  }

  async function save(u) {
    const isExisting = ingredients.some(i=>i.id===u.id);
    const clean = { ...u, price:parseFloat(u.price)||0, prev_price:parseFloat(u.prev_price)||0, pack_size:u.pack_size?parseFloat(u.pack_size):null, stock:parseFloat(u.stock)||0, min_stock:parseFloat(u.min_stock)||5 };
    if (isExisting) {
      const { id, ...updateFields } = clean;
      const { error } = await supabase.from("ingredients").update(updateFields).eq("id", id);
      if (error) { alert("Error guardando: "+error.message); return; }
      setIngredients(prev => prev.map(i => i.id===u.id ? clean : i));
    } else {
      const { id, ...insertFields } = clean;
      const { data, error } = await supabase.from("ingredients").insert(insertFields).select().single();
      if (error) { alert("Error guardando: "+error.message); return; }
      setIngredients(prev => [...prev, data]);
    }
    setEd(null); setAN(false);
  }
  async function removeIngredient(id) {
    const { error } = await supabase.from("ingredients").delete().eq("id", id);
    if (error) { alert("Error eliminando: "+error.message); return; }
    setIngredients(p=>p.filter(i=>i.id!==id));
  }

  const blank = { name:"", category:"carnes", supplier:"", unit_purchase:"lb", unit_use:"lb", unit_inventory:"lb", price:"", prev_price:"", pack_size:"", stock:0, min_stock:5 };

  return (
    <div style={{ padding:20, display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10 }}>
        {[
          { label:t("total",lang),          value:ingredients.length,                                       color:TEXT },
          { label:t("pricesRose",lang),value:ingredients.filter(i=>i.price>i.prev_price).length,       color:"#E24B4A" },
          { label:t("criticalStock",lang),  value:ingredients.filter(i=>parseFloat(i.stock)<=(parseFloat(i.min_stock)||5)).length,     color:"#EF9F27" },
          { label:t("suppliers",lang),    value:[...new Set(ingredients.map(i=>i.supplier))].length,       color:ACCENT },
        ].map((s,i) => (
          <div key={i} style={{ background:SURF, border:`1px solid ${BDR}`, borderRadius:10, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:TEXT2, marginBottom:4 }}>{s.label}</div>
            <div style={{ fontSize:20, fontWeight:700, color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:160 }}>
          <i className="ti ti-search" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:TEXT2, fontSize:13 }}/>
          <input style={{ ...g.inp, paddingLeft:30 }} placeholder={t("search",lang)} value={search} onChange={e=>setSrc(e.target.value)}/>
        </div>
        <select style={g.sel} value={fCat} onChange={e=>setFC(e.target.value)}>
          <option value="all">{t("all",lang)}</option>
          {CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}
        </select>
        <select style={g.sel} value={fSup} onChange={e=>setFS(e.target.value)}>
          <option value="all">{t("allSuppliers",lang)}</option>
          {suppliers.map(s=><option key={s}>{s}</option>)}
        </select>
        <button style={g.btnP} onClick={()=>setAN(true)}><i className="ti ti-plus"/>{t("add",lang)}</button>
        <button style={{...g.btnS,background:"rgba(239,159,39,0.1)",color:"#EF9F27",border:"1px solid rgba(239,159,39,0.3)"}} onClick={detectDuplicates}><i className="ti ti-copy"/>{lang==="en"?"Detect duplicates":"Detectar duplicados"}</button>
      </div>

      {showDups&&<div style={{...g.card,padding:16,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"#EF9F27"}}><i className="ti ti-copy" style={{marginRight:6}}/>
              {dupGroups.length===0
                ? (lang==="en"?"No duplicates found ✓":"Sin duplicados encontrados ✓")
                : `${dupGroups.length} ${lang==="en"?"group(s) of possible duplicates found":"grupo(s) de posibles duplicados encontrados"}`}
            </div>
            {dupGroups.length>0&&<div style={{fontSize:11,color:TEXT2,marginTop:2}}>{lang==="en"?"Select which name to keep for each group, then merge":"Selecciona qué nombre conservar en cada grupo y fusiona"}</div>}
          </div>
          <div style={{display:"flex",gap:8}}>
            {dupGroups.length>0&&<button style={{...g.btnP,background:"#EF9F27"}} onClick={mergeAll} disabled={merging}>
              <i className="ti ti-git-merge"/>{merging?(lang==="en"?"Merging...":"Fusionando..."):(lang==="en"?"Merge all":"Fusionar todos")}
            </button>}
            <button style={g.btnS} onClick={()=>setShowDups(false)}><i className="ti ti-x"/></button>
          </div>
        </div>
        {dupGroups.map((group, gi)=>(
          <div key={gi} style={{background:SURF2,borderRadius:10,padding:12,border:"1px solid rgba(239,159,39,0.2)"}}>
            <div style={{fontSize:11,color:"#EF9F27",fontWeight:600,marginBottom:8}}>{lang==="en"?"Group":"Grupo"} {gi+1} — {lang==="en"?"select which to keep:":"selecciona cuál conservar:"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {group.items.map(ing=>(
                <div key={ing.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:group.keepId===ing.id?"rgba(200,49,43,0.06)":SURF,border:`1px solid ${group.keepId===ing.id?ACCENT:BDR}`,cursor:"pointer"}} onClick={()=>setDupGroups(prev=>prev.map((g,i)=>i===gi?{...g,keepId:ing.id}:g))}>
                  <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${group.keepId===ing.id?ACCENT:BDR}`,background:group.keepId===ing.id?ACCENT:"transparent",flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600}}>{ing.name}</div>
                    <div style={{fontSize:10,color:TEXT2}}>{ing.supplier} · ${ing.price}/{ing.unit_use} · stock: {ing.stock} {ing.unit_inventory}</div>
                  </div>
                  {group.keepId===ing.id&&<span style={{fontSize:10,background:"rgba(200,49,43,0.10)",color:ACCENT,padding:"2px 8px",borderRadius:99,fontWeight:700}}>{lang==="en"?"KEEP":"CONSERVAR"}</span>}
                </div>
              ))}
            </div>
            <div style={{marginTop:8,fontSize:10,color:TEXT2}}>
              <i className="ti ti-info-circle" style={{marginRight:4}}/>
              {lang==="en"?"Stocks will be summed. Most recent price will be kept.":"Se sumarán los stocks. Se conservará el precio más reciente."}
            </div>
          </div>
        ))}
      </div>}

      {grouped.map(cat=>(
        <div key={cat.id} style={g.card}>
          <div style={g.catH(cat.color)}><i className="ti ti-basket" style={{fontSize:13}}/>{lang==="en"?cat.label_en:cat.label}<span style={{marginLeft:6,fontSize:10,fontWeight:400,opacity:0.7}}>({cat.items.length})</span></div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead><tr>
                <th style={g.th}>{t("name",lang)}</th><th style={g.th}>{t("supplier",lang)}</th>
                <th style={g.th}>{t("unitPurchase",lang)}</th><th style={g.th}>{t("unitUse",lang)}</th><th style={g.th}>{t("unitInventory",lang)}</th>
                <th style={g.th}>{t("price",lang)}</th><th style={g.th}>{t("previous",lang)}</th><th style={g.th}>{t("variation",lang)}</th>
                <th style={g.th}>{t("stock",lang)}</th><th style={g.th}>{t("actions",lang)}</th>
              </tr></thead>
              <tbody>
                {cat.items.map(ing => {
                  const d  = priceDiff(ing.price, ing.prev_price);
                  const minSt = parseFloat(ing.min_stock)||5;
                  const st = parseFloat(ing.stock)<=minSt?"err":parseFloat(ing.stock)<=minSt*1.5?"warn":"ok";
                  return (
                    <tr key={ing.id} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{...g.td,fontWeight:500}}>{ing.name}</td>
                      <td style={{...g.td,color:TEXT2}}>{ing.supplier}</td>
                      <td style={g.td}><span style={g.badge("gray")}>{ing.unit_purchase}</span></td>
                      <td style={g.td}><span style={g.badge("gray")}>{ing.unit_use}</span></td>
                      <td style={g.td}><span style={g.badge("gray")}>{ing.unit_inventory}</span></td>
                      <td style={{...g.td,fontWeight:700,color:ACCENT}}>${ing.price.toFixed(2)}</td>
                      <td style={{...g.td,color:TEXT2}}>${ing.prev_price.toFixed(2)}</td>
                      <td style={g.td}><span style={g.pp(d.up,d.same)}>{d.same?"—":<>{d.up?"+":"-"}{d.pct}%</>}</span></td>
                      <td style={g.td}><span style={g.badge(st)}>{ing.stock} {ing.unit_inventory}</span></td>
                      <td style={g.td}>
                        <div style={{display:"flex",gap:5}}>
                          <button style={g.btnI} onClick={()=>setEd(ing)}><i className="ti ti-pencil" style={{fontSize:12}}/>{t("edit",lang)}</button>
                          <button style={g.btnD} onClick={()=>removeIngredient(ing.id)}><i className="ti ti-trash" style={{fontSize:12}}/>{t("delete",lang)}</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {(edit||addNew) && (
        <IngModal item={edit||blank} onSave={save} onClose={()=>{setEd(null);setAN(false);}} isNew={addNew} lang={lang}/>
      )}
    </div>
  );
}

function IngModal({ item, onSave, onClose, isNew, lang }) {
  const [f, setF] = useState({...item});
  const sf = (k,v) => setF(x=>({...x,[k]:v}));
  const cpu = f.pack_size && parseFloat(f.pack_size)>0 && f.price
    ? (parseFloat(f.price)/parseFloat(f.pack_size)).toFixed(3) : null;
  return (
    <div style={g.modal}>
      <div style={g.mbox} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:14,fontWeight:700}}>{isNew?t("newIngredient",lang):t("editIngredient",lang)}</span>
          <button style={g.btnS} onClick={onClose}><i className="ti ti-x"/></button>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:2,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("name",lang)}</label><input style={g.inp} value={f.name} onChange={e=>sf("name",e.target.value)}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("category",lang)}</label>
            <select style={{...g.sel,width:"100%"}} value={f.category} onChange={e=>sf("category",e.target.value)}>{CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}</select>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("supplier",lang)}</label><input style={g.inp} value={f.supplier} onChange={e=>sf("supplier",e.target.value)}/></div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("currentPrice",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={f.price} onChange={e=>sf("price",e.target.value)}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("prevPrice",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={f.prev_price} onChange={e=>sf("prev_price",e.target.value)}/></div>
        </div>
        <div style={{display:"flex",gap:10}}>
          {["unit_purchase","unit_use","unit_inventory"].map(k=>(
            <div key={k} style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
              <label style={g.lbl}>{k==="unit_purchase"?t("unitPurchase",lang):k==="unit_use"?t("unitUse",lang):t("unitInventory",lang)}</label>
              <select style={{...g.sel,width:"100%"}} value={f[k]} onChange={e=>sf(k,e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("unitsPerPack",lang)}</label><input style={g.inp} type="text" inputMode="decimal" placeholder={lang==="en"?"e.g: 169 fl oz":"ej: 169 fl oz"} value={f.pack_size||""} onChange={e=>sf("pack_size",e.target.value)}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("currentStock",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={f.stock} onChange={e=>sf("stock",e.target.value)}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("minStock",lang)}</label><input style={g.inp} type="text" inputMode="decimal" placeholder="5" value={f.min_stock??""} onChange={e=>sf("min_stock",e.target.value)}/></div>
        </div>
        {cpu && <div style={{fontSize:11,color:ACCENT,background:"rgba(200,49,43,0.05)",padding:"8px 12px",borderRadius:8}}><i className="ti ti-calculator" style={{marginRight:6}}/>{t("costPerUnit",lang)}: <strong>${cpu}</strong></div>}
        <div style={{display:"flex",gap:10}}>
          <button style={{...g.btnP,flex:1,justifyContent:"center"}} onClick={()=>onSave(f)}><i className="ti ti-check"/>{t("save",lang)}</button>
          <button style={g.btnS} onClick={onClose}>{t("cancel",lang)}</button>
        </div>
      </div>
    </div>
  );
}

// ─── RECIPES ─────────────────────────────────────────────────────────────────
function printRecipe(recipe, ingredients, lang) {
  const recName = (lang==="en" && recipe.name_en) ? recipe.name_en : recipe.name;
  const T = lang==="en" ? {
    subtitle:"CHEFCOST · RECIPE CARD", portions:"Portions", portionSize:"Portion size", prep:"Prep",
    cook:"Cook", shelf:"Shelf life", allergens:"Allergens", ingredientsT:"Ingredients", noIng:"No ingredients",
    prepT:"Preparation", noSteps:"No steps registered yet.", yes:"Yes", no:"No", generated:"Generated with ChefCost",
  } : {
    subtitle:"CHEFCOST · FICHA DE RECETA", portions:"Porciones", portionSize:"Tamaño/porción", prep:"Prep",
    cook:"Cocción", shelf:"Vida útil", allergens:"Alérgenos", ingredientsT:"Ingredientes", noIng:"Sin ingredientes",
    prepT:"Preparación", noSteps:"Sin pasos registrados todavía.", yes:"Sí", no:"No", generated:"Generado con ChefCost",
  };
  const ing = recipe.ingredients.map(ri => {
    const i = ingredients.find(x => x.id === ri.ing_id);
    return `<div class="ing-row"><span class="ing-qty">${ri.qty} ${ri.unit}</span><span class="ing-name">${i ? i.name : "Ingrediente"}</span></div>`;
  });
  const half = Math.ceil(ing.length / 2);
  const col1 = ing.slice(0, half).join("");
  const col2 = ing.slice(half).join("");

  const stageMeta = lang==="en" ? {
    prep:    { label: "Preparation", icon: "🔪" },
    coccion: { label: "Cooking",     icon: "🔥" },
    montaje: { label: "Assembly",    icon: "🍽️" },
  } : {
    prep:    { label: "Preparación", icon: "🔪" },
    coccion: { label: "Cocción",     icon: "🔥" },
    montaje: { label: "Montaje",     icon: "🍽️" },
  };
  const stepsHtml = ["prep", "coccion", "montaje"].map(stageId => {
    const steps = (recipe.steps || []).filter(s => s.stage === stageId);
    if (steps.length === 0) return "";
    const items = steps.map((s) => {
      const stepText = (lang==="en" && s.text_en) ? s.text_en : (s.text || (lang==="en" ? "(no description)" : "(sin descripción)"));
      return `<li>${stepText}${s.time ? ` <span class="step-time">${s.time} min</span>` : ""}</li>`;
    }).join("");
    return `<div class="stage-block"><div class="stage-title">${stageMeta[stageId].icon} ${stageMeta[stageId].label}</div><ol>${items}</ol></div>`;
  }).join("");

  const ALLERGEN_LIST = lang==="en" ? [
    {id:"gluten",label:"Gluten"},{id:"lacteos",label:"Dairy"},{id:"huevo",label:"Egg"},
    {id:"frutos_secos",label:"Tree nuts"},{id:"cacahuate",label:"Peanut"},{id:"soya",label:"Soy"},
    {id:"mariscos",label:"Shellfish"},{id:"pescado",label:"Fish"},{id:"sesamo",label:"Sesame"}
  ] : [
    {id:"gluten",label:"Gluten"},{id:"lacteos",label:"Lácteos"},{id:"huevo",label:"Huevo"},
    {id:"frutos_secos",label:"Fr. secos"},{id:"cacahuate",label:"Cacahuate"},{id:"soya",label:"Soya"},
    {id:"mariscos",label:"Mariscos"},{id:"pescado",label:"Pescado"},{id:"sesamo",label:"Sésamo"}
  ];
  const recipeAllergens = recipe.allergens || [];
  const allergenCellsHtml = ALLERGEN_LIST.map(a => {
    const has = recipeAllergens.includes(a.id);
    return `<div class="allergen-cell ${has?'has':''}"><div class="allergen-name">${a.label}</div><div class="allergen-value">${has?T.yes:T.no}</div></div>`;
  }).join("");

  const bodyHtml = `
    <div class="cc-header">
      <div class="cc-logo-mark">CC</div>
      <div class="cc-header-text">
        <div class="cc-brand">${T.subtitle}</div>
        <div class="cc-title">${recName}</div>
      </div>
    </div>

    <div class="info-strip">
      <div class="info-cell"><div class="info-label">${T.portions}</div><div class="info-value">${recipe.portions}</div></div>
      <div class="info-cell"><div class="info-label">${T.portionSize}</div><div class="info-value">${recipe.portion_size?`${recipe.portion_size} ${recipe.portion_unit}`:"—"}</div></div>
      <div class="info-cell"><div class="info-label">${T.prep}</div><div class="info-value">${recipe.prep_time || "—"}</div></div>
      <div class="info-cell"><div class="info-label">${T.cook}</div><div class="info-value">${recipe.cook_time || "—"}</div></div>
      <div class="info-cell"><div class="info-label">${T.shelf}</div><div class="info-value">${recipe.shelf_life || "—"}</div></div>
    </div>

    <div class="section-title"><span class="dot"></span>${T.allergens}</div>
    <div class="allergen-grid">${allergenCellsHtml}</div>

    <div class="two-col-section">
      <div class="col-block">
        <div class="section-title"><span class="dot"></span>${T.ingredientsT}</div>
        <div class="ing-columns">
          <div class="ing-col">${col1 || `<div class='ing-row'><span class='ing-name'>${T.noIng}</span></div>`}</div>
          <div class="ing-col">${col2}</div>
        </div>
      </div>
    </div>

    <div class="section-title"><span class="dot"></span>${T.prepT}</div>
    <div class="prep-section">
      ${stepsHtml || `<p class='empty-note'>${T.noSteps}</p>`}
    </div>
  `;

  const old = document.getElementById("__recipe_print_container");
  if (old) old.remove();
  let styleTag = document.getElementById("__recipe_print_style");
  if (styleTag) styleTag.remove();

  styleTag = document.createElement("style");
  styleTag.id = "__recipe_print_style";
  styleTag.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
    #__recipe_print_container {
      font-family: 'Segoe UI Variable','Segoe UI',system-ui,sans-serif;
      color: #1a1a1a;
      background: #fff;
    }
    #__recipe_print_container .cc-header { display:flex; align-items:center; gap:16px; padding-bottom:18px; margin-bottom:18px; border-bottom:3px solid #1a1a1a; }
    #__recipe_print_container .cc-logo-mark { width:54px; height:54px; border-radius:12px; background:#1a1a1a; color:#C8312B; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; flex-shrink:0; letter-spacing:0.5px; }
    #__recipe_print_container .cc-brand { font-size:10px; color:#C8312B; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:3px; }
    #__recipe_print_container .cc-title { font-size:22px; font-weight:800; color:#111; }
    #__recipe_print_container .info-strip { display:flex; border-radius:10px; overflow:hidden; border:1px solid #ddd; margin-bottom:22px; }
    #__recipe_print_container .info-cell { flex:1; padding:10px 14px; border-right:1px solid #e5e5e5; background:#fafafa; }
    #__recipe_print_container .info-cell:nth-child(odd) { background:#fafafa; }
    #__recipe_print_container .info-cell:last-child { border-right:none; }
    #__recipe_print_container .info-label { font-size:9px; color:#888; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:4px; }
    #__recipe_print_container .info-value { font-size:14px; font-weight:700; color:#1a1a1a; }
    #__recipe_print_container .section-title { display:flex; align-items:center; gap:7px; font-size:13px; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; color:#1a1a1a; margin:22px 0 10px 0; }
    #__recipe_print_container .section-title .dot { width:8px; height:8px; border-radius:50%; background:#C8312B; flex-shrink:0; }
    #__recipe_print_container .allergen-grid { display:grid; grid-template-columns:repeat(9,1fr); gap:6px; }
    #__recipe_print_container .allergen-cell { border:1px solid #e0e0e0; border-radius:8px; padding:7px 4px; text-align:center; background:#fafafa; }
    #__recipe_print_container .allergen-cell.has { border-color:#e0a8a4; background:#fdf0ef; }
    #__recipe_print_container .allergen-name { font-size:8.5px; font-weight:700; color:#555; margin-bottom:3px; }
    #__recipe_print_container .allergen-cell.has .allergen-name { color:#a32d2d; }
    #__recipe_print_container .allergen-value { font-size:10px; font-weight:700; color:#999; }
    #__recipe_print_container .allergen-cell.has .allergen-value { color:#a32d2d; }
    #__recipe_print_container .ing-columns { display:flex; gap:30px; }
    #__recipe_print_container .ing-col { flex:1; }
    #__recipe_print_container .ing-row { display:flex; gap:10px; padding:8px 0; border-bottom:1px solid #eee; font-size:12px; }
    #__recipe_print_container .ing-qty { color:#C8312B; font-weight:700; min-width:68px; flex-shrink:0; }
    #__recipe_print_container .ing-name { color:#222; }
    #__recipe_print_container .prep-section { font-size:12.5px; line-height:1.7; }
    #__recipe_print_container .stage-block { margin-bottom:14px; padding-left:14px; border-left:3px solid #C8312B; }
    #__recipe_print_container .stage-title { font-weight:800; font-size:12.5px; margin-bottom:5px; color:#1a1a1a; }
    #__recipe_print_container .stage-block ol { margin:0; padding-left:18px; }
    #__recipe_print_container .stage-block li { margin-bottom:4px; color:#333; }
    #__recipe_print_container .step-time { color:#C8312B; font-weight:700; font-size:11px; }
    #__recipe_print_container .empty-note { color:#999; font-size:12px; font-style:italic; }
    #__recipe_print_container .footer-note { margin-top:34px; font-size:9px; color:#aaa; border-top:1px solid #eee; padding-top:10px; display:flex; justify-content:space-between; letter-spacing:0.3px; }

    @media print {
      body * { visibility: hidden !important; }
      #__recipe_print_container, #__recipe_print_container * { visibility: visible !important; }
      #__recipe_print_container { position: absolute !important; left:0; top:0; }
      #__recipe_print_close { display: none !important; }
    }
  `;
  document.head.appendChild(styleTag);

  const container = document.createElement("div");
  container.id = "__recipe_print_container";
  container.innerHTML = bodyHtml + `<div class="footer-note"><span>${T.generated} · ${new Date().toLocaleDateString()}</span><span>Food Cost Manager</span></div>`;
  container.style.cssText = "position:fixed;inset:0;background:#fff;z-index:99999;overflow:auto;padding:44px;max-width:780px;margin:0 auto;display:block;";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = lang==="en"?"✕ Close preview":"✕ Cerrar vista previa";
  closeBtn.id = "__recipe_print_close";
  closeBtn.style.cssText = "position:fixed;top:16px;right:16px;background:#fff;color:#C8312B;border:1px solid #C8312B;border-radius:6px;padding:10px 16px;font-size:13px;cursor:pointer;z-index:100000;font-family:'Segoe UI Variable','Segoe UI',system-ui,sans-serif;font-weight:600;";
  closeBtn.onclick = () => { container.remove(); document.title = origTitle; };
  container.appendChild(closeBtn);

  document.body.appendChild(container);
  const origTitle = document.title;
  const safeName = recName.replace(/[^a-z0-9\s\-_]/gi, "").trim().replace(/\s+/g, "_");
  document.title = `ChefCost_${safeName}`;
  setTimeout(() => { window.print(); document.title = origTitle; }, 150);
}

function Recipes() {
  const { ingredients, recipes, setRecipes, lang } = useApp();
  const [cats,    setCats] = useState(DEFAULT_RECIPE_CATS);
  const [edit,    setEd]   = useState(null);
  const [addNew,  setAN]   = useState(false);
  const [fCat,    setFC]   = useState("all");
  const [sort,    setSort] = useState("name");
  const [recType, setRecType] = useState("prep"); // "prep" or "plate"

  useEffect(() => {
    async function loadCats() {
      const { data, error } = await supabase.from("recipe_categories").select("*");
      if (!error && data && data.length > 0) {
        setCats(prev => {
          const merged = [...prev];
          data.forEach(c => { if (!merged.find(m=>m.id===c.id)) merged.push(c); });
          return merged;
        });
      }
    }
    loadCats();
  }, []);

  const filteredByType = recipes.filter(r => (r.recipe_type||"plate") === recType);
  const filtered = filteredByType
    .filter(r => fCat==="all" || r.category===fCat)
    .sort((a,b) => {
      if (sort==="margin") return calcRecipe(b,ingredients,recipes).margin - calcRecipe(a,ingredients,recipes).margin;
      if (sort==="cost")   return calcRecipe(b,ingredients,recipes).cpp   - calcRecipe(a,ingredients,recipes).cpp;
      return a.name.localeCompare(b.name);
    });
  const grouped = cats.map(c=>({...c,items:filtered.filter(r=>r.category===c.id)})).filter(c=>c.items.length>0);
  // Also show uncategorized
  const uncatItems = filtered.filter(r=>!cats.find(c=>c.id===r.category));
  if (uncatItems.length > 0) grouped.push({id:"__uncat",label:lang==="en"?"Uncategorized":"Sin categoría",label_en:"Uncategorized",color:TEXT2,items:uncatItems});

  async function save(u) {
    const isExisting = recipes.some(r=>r.id===u.id);
    const clean = {
      ...u,
      portions: parseFloat(u.portions)||1,
      portion_size: u.portion_size?parseFloat(u.portion_size):null,
      waste_pct: parseFloat(u.waste_pct)||0,
      selling_price: u.selling_price?parseFloat(u.selling_price):null,
      target_margin: u.target_margin?parseFloat(u.target_margin):null,
      ingredients: u.ingredients||[],
      steps: u.steps||[],
      allergens: u.allergens||[],
    };
    if (isExisting) {
      const { id, ...updateFields } = clean;
      const { error } = await supabase.from("recipes").update(updateFields).eq("id", id);
      if (error) { alert("Error guardando receta: "+error.message); return; }
      setRecipes(prev => prev.map(r=>r.id===u.id?clean:r));
    } else {
      const { id, ...insertFields } = clean;
      const { data, error } = await supabase.from("recipes").insert(insertFields).select().single();
      if (error) { alert("Error guardando receta: "+error.message); return; }
      setRecipes(prev => [...prev, data]);
    }
    setEd(null); setAN(false);
  }
  async function removeRecipe(id) {
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) { alert("Error eliminando receta: "+error.message); return; }
    setRecipes(p=>p.filter(r=>r.id!==id));
  }
  async function addCat(label, labelEn) {
    const id = label.toLowerCase().replace(/\s+/g,"-");
    if (!cats.find(c=>c.id===id)) {
      const colors=["#EF9F27","#C084FC","#38BDF8",ACCENT,"#E24B4A","#378ADD","#F472B6","#34D399"];
      const newCat = {id, label, label_en: labelEn||label, color:colors[cats.length%colors.length]};
      const { error } = await supabase.from("recipe_categories").upsert(newCat);
      if (error) { console.error("Error guardando categoría:", error.message); }
      setCats(p=>[...p,newCat]);
    }
  }

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10}}>
        {(() => {
          const all = recipes.map(r=>({...r,...calcRecipe(r,ingredients,recipes)}));
          const plateRecipes = all.filter(r=>(r.recipe_type||"plate")==="plate");
          const best  = plateRecipes.length ? plateRecipes.reduce((b,r)=>r.margin>b.margin?r:b,plateRecipes[0]) : null;
          const worst = plateRecipes.length ? plateRecipes.reduce((b,r)=>r.margin<b.margin?r:b,plateRecipes[0]) : null;
          const avg   = plateRecipes.length ? plateRecipes.reduce((s,r)=>s+r.cpp,0)/plateRecipes.length : 0;
          return [
            {label:lang==="en"?"Dishes":"Platillos", value:plateRecipes.length, color:TEXT},
            {label:lang==="en"?"Prep recipes":"Prep recipes", value:recipes.filter(r=>(r.recipe_type||"plate")==="prep").length, color:"#378ADD"},
            {label:t("bestMargin",lang), value:best?(lang==="en"&&best.name_en?best.name_en:best.name):"—", color:ACCENT, small:true},
            {label:t("avgCost",lang), value:`$${avg.toFixed(2)}`, color:"#EF9F27"},
          ];
        })().map((s,i)=>(
          <div key={i} style={{background:SURF,border:`1px solid ${BDR}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontSize:10,color:TEXT2,marginBottom:4}}>{s.label}</div>
            <div style={{fontSize:s.small?13:22,fontWeight:700,color:s.color,lineHeight:1.3}}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Type tabs */}
      <div style={{display:"flex",gap:4,background:SURF2,borderRadius:10,padding:4,width:"fit-content"}}>
        {[["prep",lang==="en"?"🔪 Prep recipes":"🔪 Prep recipes"],["plate",lang==="en"?"🍽️ Dishes":"🍽️ Platillos"]].map(([id,label])=>(
          <button key={id} style={{background:recType===id?SURF:"transparent",color:recType===id?TEXT:TEXT2,border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:recType===id?600:400,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}} onClick={()=>{setRecType(id);setFC("all");}}>
            {label}
            <span style={{fontSize:10,background:recType===id?"rgba(200,49,43,0.10)":SURF2,color:recType===id?ACCENT:TEXT2,padding:"1px 6px",borderRadius:99}}>
              {recipes.filter(r=>(r.recipe_type||"plate")===id).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <select style={g.sel} value={fCat} onChange={e=>setFC(e.target.value)}>
          <option value="all">{t("all",lang)}</option>
          {cats.map(c=><option key={c.id} value={c.id}>{lang==="en"&&c.label_en?c.label_en:c.label}</option>)}
        </select>
        <select style={g.sel} value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="name">{t("sortAZ",lang)}</option>
          <option value="margin">{t("sortMarginBest",lang)}</option>
          <option value="cost">{t("sortCostHigh",lang)}</option>
        </select>
        <button style={{...g.btnP,marginLeft:"auto"}} onClick={()=>setAN(true)}><i className="ti ti-plus"/>{t("newRecipe",lang)}</button>
      </div>

      {grouped.length===0&&<div style={{...g.card,padding:40,textAlign:"center"}}>
        <i className={`ti ${recType==="prep"?"ti-tool":"ti-book"}`} style={{fontSize:44,color:TEXT2,display:"block",marginBottom:12}}/>
        <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>{recType==="prep"?(lang==="en"?"No prep recipes yet":"Sin prep recipes todavía"):(lang==="en"?"No dishes yet":"Sin platillos todavía")}</div>
        <div style={{fontSize:11,color:TEXT2,marginBottom:16}}>{recType==="prep"?(lang==="en"?"Create sauces, bases, marinades and other preparations":"Crea salsas, bases, marinadas y otras preparaciones"):(lang==="en"?"Create your menu dishes here":"Crea los platos de tu menú aquí")}</div>
        <button style={g.btnP} onClick={()=>setAN(true)}><i className="ti ti-plus"/>{t("newRecipe",lang)}</button>
      </div>}

      {grouped.map(cat=>(
        <div key={cat.id} style={g.card}>
          <div style={g.catH(cat.color)}><i className="ti ti-book" style={{fontSize:13}}/>{lang==="en"&&cat.label_en?cat.label_en:cat.label}<span style={{marginLeft:6,fontSize:10,fontWeight:400,opacity:0.7}}>({cat.items.length})</span></div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>
                <th style={g.th}>{t("dish",lang)}</th><th style={g.th}>{t("portions",lang)}</th><th style={g.th}>{t("size",lang)}</th>
                <th style={g.th}>{t("waste",lang)}</th><th style={g.th}>{t("cost",lang)}</th><th style={g.th}>{t("costWaste",lang)}</th>
                <th style={g.th}>{t("costPerPortion",lang)}</th><th style={g.th}>{t("sellPrice",lang)}</th><th style={g.th}>{t("margin",lang)}</th><th style={g.th}>{t("allergensCol",lang)}</th><th style={g.th}>{t("actions",lang)}</th>
              </tr></thead>
              <tbody>
                {cat.items.map(r=>{
                  const c=calcRecipe(r,ingredients,recipes);
                  return (
                    <tr key={r.id} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{...g.td,fontWeight:600}}>{lang==="en"&&r.name_en?r.name_en:r.name}</td>
                      <td style={g.td}>{r.portions}</td>
                      <td style={g.td}>{r.portion_size?<span style={{color:"#378ADD",fontWeight:600}}>{r.portion_size} {r.portion_unit}</span>:"—"}</td>
                      <td style={g.td}><span style={g.badge("warn")}>{r.waste_pct}%</span></td>
                      <td style={{...g.td,color:TEXT2}}>${c.raw.toFixed(2)}</td>
                      <td style={{...g.td,color:"#EF9F27"}}>${c.total.toFixed(2)}</td>
                      <td style={{...g.td,fontWeight:700,color:ACCENT}}>${c.cpp.toFixed(3)}</td>
                      <td style={g.td}>${parseFloat(r.selling_price||0).toFixed(2)}</td>
                      <td style={g.td}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:40,height:4,background:BDR,borderRadius:99,overflow:"hidden"}}>
                            <div style={{height:4,width:`${Math.min(c.margin,100)}%`,background:mColor(c.margin),borderRadius:99}}/>
                          </div>
                          <span style={g.badge(mType(c.margin))}>{c.margin.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td style={g.td}>
                        {r.allergens&&r.allergens.length>0
                          ? <div style={{display:"flex",gap:2,flexWrap:"wrap"}} title={r.allergens.map(id=>ALLERGENS.find(a=>a.id===id)?.label).join(", ")}>
                              {r.allergens.slice(0,4).map(id=>{const a=ALLERGENS.find(x=>x.id===id);return a?<span key={id} style={{fontSize:14}}>{a.icon}</span>:null;})}
                              {r.allergens.length>4&&<span style={{fontSize:10,color:TEXT2}}>+{r.allergens.length-4}</span>}
                            </div>
                          : <span style={{fontSize:11,color:TEXT2}}>—</span>
                        }
                      </td>
                      <td style={g.td}>
                        <div style={{display:"flex",gap:5}}>
                          <button style={g.btnI} onClick={()=>printRecipe(r,ingredients,lang)}><i className="ti ti-file-download" style={{fontSize:12}}/>PDF</button>
                          <button style={g.btnI} onClick={()=>setEd(r)}><i className="ti ti-pencil" style={{fontSize:12}}/>{t("edit",lang)}</button>
                          <button style={g.btnD} onClick={()=>removeRecipe(r.id)}><i className="ti ti-trash" style={{fontSize:12}}/>{t("delete",lang)}</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {(edit||addNew)&&<RecipeModal recipe={edit} isNew={addNew} onSave={save} onClose={()=>{setEd(null);setAN(false);}} ingredients={ingredients} cats={cats} onAddCat={addCat} lang={lang} allRecipes={recipes} defaultType={recType}/>}
    </div>
  );
}

const ALLERGENS=[{id:"gluten",label:"Gluten",label_en:"Gluten",icon:"🌾"},{id:"lacteos",label:"Lácteos",label_en:"Dairy",icon:"🥛"},{id:"huevo",label:"Huevo",label_en:"Egg",icon:"🥚"},{id:"frutos_secos",label:"Frutos secos",label_en:"Tree nuts",icon:"🌰"},{id:"cacahuate",label:"Cacahuate",label_en:"Peanut",icon:"🥜"},{id:"soya",label:"Soya",label_en:"Soy",icon:"🫘"},{id:"mariscos",label:"Mariscos",label_en:"Shellfish",icon:"🦐"},{id:"pescado",label:"Pescado",label_en:"Fish",icon:"🐟"},{id:"sesamo",label:"Sésamo",label_en:"Sesame",icon:"⚪"}];
const STAGES=[{id:"prep",label:"Preparación",label_en:"Preparation",icon:"🔪",color:"#378ADD"},{id:"coccion",label:"Cocción",label_en:"Cooking",icon:"🔥",color:"#EF9F27"},{id:"montaje",label:"Montaje",label_en:"Assembly",icon:"🍽️",color:ACCENT}];

function RecipeModal({recipe:init,isNew,onSave,onClose,ingredients,cats,onAddCat,lang,allRecipes=[],defaultType="plate"}) {
  const blank={id:Date.now(),name:"",name_en:"",category:cats[0]?.id||"",recipe_type:defaultType,portions:1,portion_size:"",portion_unit:"oz",waste_pct:5,selling_price:"",target_margin:"",ingredients:[],steps:[],allergens:[],prep_time:"",cook_time:"",shelf_life:"",total_yield:"",yield_unit:"L"};
  const [r,setR]=useState(init||blank);
  const [cm,setCM]=useState("price");
  const [bm,setBM]=useState(false);
  const [bs,setBS]=useState(r.portions||1);
  const [nc,setNC]=useState("");
  const [ncEn,setNCEn]=useState("");
  const [snc,setSNC]=useState(false);
  const [activeTab,setActiveTab]=useState("ingredients");
  const sr=(k,v)=>setR(x=>({...x,[k]:v}));
  const addI=()=>setR(x=>({...x,ingredients:[...x.ingredients,{id:Date.now(),ing_id:"",qty:"",unit:"oz"}]}));
  const upI=(idx,k,v)=>setR(x=>{const a=[...x.ingredients];a[idx]={...a[idx],[k]:v};return{...x,ingredients:a}});
  const rmI=(idx)=>setR(x=>({...x,ingredients:x.ingredients.filter((_,i)=>i!==idx)}));
  const addStep=(stage)=>setR(x=>({...x,steps:[...(x.steps||[]),{id:Date.now(),stage,text:"",time:""}]}));
  const upStep=(id,k,v)=>setR(x=>({...x,steps:x.steps.map(s=>s.id===id?{...s,[k]:v}:s)}));
  const rmStep=(id)=>setR(x=>({...x,steps:x.steps.filter(s=>s.id!==id)}));
  const toggleAllergen=(aid)=>setR(x=>({...x,allergens:(x.allergens||[]).includes(aid)?x.allergens.filter(a=>a!==aid):[...(x.allergens||[]),aid]}));
  const c=calcRecipe(r,ingredients,allRecipes);
  const dp=bm?parseInt(bs)||1:parseInt(r.portions)||1;
  const cpp=bm?c.total/dp:c.cpp;
  const sug=r.target_margin?cpp/(1-parseFloat(r.target_margin)/100):null;
  const lm=r.selling_price?((parseFloat(r.selling_price)-cpp)/parseFloat(r.selling_price))*100:null;
  return (
    <div style={g.modal}>
      <div style={g.mbox} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:14,fontWeight:700}}>{isNew?t("newRecipe",lang):t("editRecipe",lang)}</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",gap:4,background:SURF2,borderRadius:8,padding:3}}>
              {[["plate",lang==="en"?"🍽️ Dish":"🍽️ Platillo"],["prep",lang==="en"?"🔪 Prep":"🔪 Prep"]].map(([id,label])=>(
                <button key={id} style={{background:r.recipe_type===id?SURF:"transparent",color:r.recipe_type===id?TEXT:TEXT2,border:"none",borderRadius:6,padding:"5px 10px",fontSize:11,fontWeight:r.recipe_type===id?600:400,cursor:"pointer"}} onClick={()=>sr("recipe_type",id)}>
                  {label}
                </button>
              ))}
            </div>
            <button style={g.btnS} onClick={onClose}><i className="ti ti-x"/></button>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:2,display:"flex",flexDirection:"column",gap:8}}>
            <div>
              <label style={g.lbl}>{t("nameEs",lang)}</label>
              <input style={g.inp} value={r.name} onChange={e=>sr("name",e.target.value)} placeholder="ej: Tacos de Carne"/>
            </div>
            <div>
              <label style={g.lbl}>{t("nameEn",lang)} <span style={{color:TEXT2,fontWeight:400}}>— {t("optional",lang)}</span></label>
              <input style={g.inp} value={r.name_en||""} onChange={e=>sr("name_en",e.target.value)} placeholder="e.g: Beef Tacos"/>
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
            <label style={g.lbl}>{t("category",lang)}</label>
            <div style={{display:"flex",gap:5}}>
              <select style={{...g.sel,flex:1}} value={r.category} onChange={e=>sr("category",e.target.value)}>{cats.map(c=><option key={c.id} value={c.id}>{lang==="en"&&c.label_en?c.label_en:c.label}</option>)}</select>
              <button style={{...g.btnI,color:snc?ACCENT:TEXT}} onClick={e=>{e.preventDefault();e.stopPropagation();setSNC(v=>!v);}}><i className={`ti ${snc?"ti-x":"ti-plus"}`}/>{snc?t("cancel",lang):t("newCat",lang)}</button>
            </div>
            {snc&&<div style={{display:"flex",flexDirection:"column",gap:5,marginTop:4}} onClick={e=>e.stopPropagation()}>
              <input style={g.inp} placeholder={lang==="en"?"Category name (Spanish)":"Nombre categoría (Español)"} value={nc} autoFocus onChange={e=>setNC(e.target.value)}/>
              <input style={g.inp} placeholder={lang==="en"?"Category name (English) — optional":"Nombre categoría (English) — opcional"} value={ncEn} onChange={e=>setNCEn(e.target.value)}/>
              <button style={g.btnP} onClick={()=>{if(nc.trim()){const id=nc.trim().toLowerCase().replace(/\s+/g,"-");onAddCat(nc.trim(),ncEn.trim());sr("category",id);setNC("");setNCEn("");setSNC(false);}}}>OK</button>
            </div>}
          </div>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
            <label style={g.lbl}>{lang==="en"?"Total yield":"Rendimiento total"}</label>
            <div style={{display:"flex",gap:5}}>
              <input style={{...g.inp,flex:1}} type="text" inputMode="decimal" placeholder={lang==="en"?"e.g: 3.5":"ej: 3.5"} value={r.total_yield||""} onChange={e=>{
                const yield_val = e.target.value;
                sr("total_yield", yield_val);
                // Auto-calculate portion size
                const portions = parseFloat(r.portions)||1;
                const yieldNum = parseFloat(yield_val)||0;
                if(yieldNum>0 && portions>0) sr("portion_size", (yieldNum/portions).toFixed(3));
              }}/>
              <select style={g.sel} value={r.yield_unit||"L"} onChange={e=>{sr("yield_unit",e.target.value);sr("portion_unit",e.target.value);}}>
                {getUnits(lang).map(u=><option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("portions",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={r.portions} onChange={e=>{
            sr("portions",e.target.value);
            // Recalculate portion size when portions change
            const portions = parseFloat(e.target.value)||1;
            const yieldNum = parseFloat(r.total_yield)||0;
            if(yieldNum>0 && portions>0) sr("portion_size", (yieldNum/portions).toFixed(3));
          }}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
            <label style={g.lbl}>{t("portionSize",lang)} <span style={{fontSize:9,color:ACCENT}}>{r.total_yield?lang==="en"?"(auto)":"(auto)":""}</span></label>
            <div style={{display:"flex",gap:5}}>
              <input style={{...g.inp,flex:1}} type="text" inputMode="decimal" placeholder="4" value={r.portion_size||""} onChange={e=>sr("portion_size",e.target.value)} readOnly={!!r.total_yield}/>
              <select style={g.sel} value={r.portion_unit||"oz"} onChange={e=>sr("portion_unit",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select>
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
            <label style={g.lbl}>{t("wastePct",lang)}</label>
            <div style={{display:"flex",gap:5,alignItems:"center"}}><input style={g.inp} type="text" inputMode="decimal" value={r.waste_pct} onChange={e=>sr("waste_pct",e.target.value)}/><span style={{color:TEXT2,fontSize:12}}>%</span></div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
            <label style={g.lbl}>{t("batch",lang)}</label>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
              <div style={{width:34,height:18,borderRadius:99,background:bm?"rgba(200,49,43,0.20)":BDR,cursor:"pointer",position:"relative"}} onClick={()=>setBM(v=>!v)}>
                <div style={{position:"absolute",top:2,left:bm?16:2,width:14,height:14,borderRadius:99,background:bm?ACCENT:TEXT2,transition:"all 0.2s"}}/>
              </div>
              <span style={{fontSize:11,color:bm?ACCENT:TEXT2}}>{bm?"ON":"OFF"}</span>
            </div>
          </div>
        </div>
        {/* Yield summary box */}
        {r.total_yield&&parseFloat(r.total_yield)>0&&<div style={{background:"rgba(200,49,43,0.04)",border:"1px solid rgba(200,49,43,0.10)",borderRadius:8,padding:"10px 14px",fontSize:11,display:"flex",gap:20}}>
          <span style={{color:TEXT2}}>{lang==="en"?"Total yield:":"Rendimiento:"} <strong style={{color:ACCENT}}>{r.total_yield} {r.yield_unit||"L"}</strong></span>
          <span style={{color:TEXT2}}>{lang==="en"?"Portions:":"Porciones:"} <strong style={{color:ACCENT}}>{r.portions}</strong></span>
          <span style={{color:TEXT2}}>{lang==="en"?"Per portion:":"Por porción:"} <strong style={{color:ACCENT}}>{r.portion_size} {r.portion_unit}</strong></span>
        </div>}
        {bm&&<div style={{background:SURF2,borderRadius:8,padding:"10px 14px",fontSize:11,color:ACCENT}}>
          {t("batch",lang)}: <input style={{...g.inp,width:60,display:"inline-block"}} type="text" inputMode="decimal" value={bs} onChange={e=>setBS(e.target.value)}/> {t("portions",lang).toLowerCase()} = <strong>${cpp.toFixed(3)}</strong>/{lang==="en"?"portion":"porción"}
        </div>}

        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <div style={{flex:1}}><label style={g.lbl}>{t("prepTime",lang)}</label><input style={g.inp} placeholder={lang==="en"?"e.g: 25 min":"ej: 25 min"} value={r.prep_time||""} onChange={e=>sr("prep_time",e.target.value)}/></div>
          <div style={{flex:1}}><label style={g.lbl}>{t("cookTime",lang)}</label><input style={g.inp} placeholder={lang==="en"?"e.g: 15 min":"ej: 15 min"} value={r.cook_time||""} onChange={e=>sr("cook_time",e.target.value)}/></div>
          <div style={{flex:1}}><label style={g.lbl}>{t("shelfLife",lang)}</label><input style={g.inp} placeholder={lang==="en"?"e.g: 7 days":"ej: 7 días"} value={r.shelf_life||""} onChange={e=>sr("shelf_life",e.target.value)}/></div>
        </div>

        <div style={{display:"flex",gap:4,background:SURF2,borderRadius:10,padding:4,width:"fit-content"}}>
          {[["ingredients",t("tabIngredients",lang),"ti-basket"],["steps",t("tabSteps",lang),"ti-list-numbers"],["allergens",t("tabAllergens",lang),"ti-alert-triangle"]].map(([id,label,icon])=>(
            <button key={id} style={{background:activeTab===id?SURF:"transparent",color:activeTab===id?TEXT:TEXT2,border:"none",borderRadius:8,padding:"7px 14px",fontSize:11,fontWeight:activeTab===id?600:400,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5}} onClick={()=>setActiveTab(id)}>
              <i className={`ti ${icon}`}/>{label}
              {id==="allergens"&&r.allergens&&r.allergens.length>0&&<span style={{background:"rgba(226,75,74,0.2)",color:"#E24B4A",fontSize:9,padding:"1px 5px",borderRadius:99,fontWeight:700}}>{r.allergens.length}</span>}
            </button>
          ))}
        </div>

        {activeTab==="ingredients"&&<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,fontWeight:600}}>{t("tabIngredients",lang)}</span>
          <div style={{display:"flex",gap:6}}>
            {r.recipe_type==="plate"&&allRecipes.filter(pr=>(pr.recipe_type||"plate")==="prep"&&pr.id!==r.id).length>0&&(
              <button style={g.btnI} onClick={()=>setR(x=>({...x,ingredients:[...x.ingredients,{id:Date.now(),type:"prep",prep_id:"",qty:"",unit:"L"}]}))}><i className="ti ti-tools" style={{fontSize:12}}/>{lang==="en"?"Add prep":"Agregar prep"}</button>
            )}
            <button style={g.btnP} onClick={addI}><i className="ti ti-plus"/>{t("addIngredient",lang)}</button>
          </div>
        </div>
        {r.ingredients.map((ri,idx)=>{
          // Prep recipe ingredient
          if (ri.type === "prep") {
            const prepRecipes = allRecipes.filter(pr=>(pr.recipe_type||"plate")==="prep"&&pr.id!==r.id);
            const prepRec = allRecipes.find(pr=>pr.id===ri.prep_id);
            const prepCost = prepRec ? calcRecipe(prepRec,ingredients,allRecipes) : null;
            const yieldAmt = prepRec ? (parseFloat(prepRec.total_yield)||parseFloat(prepRec.portions)||1) : 1;
            const yieldUnit = prepRec ? (prepRec.yield_unit||prepRec.portion_unit||"L") : "L";
            const costPerYieldUnit = prepCost ? prepCost.total / yieldAmt : 0;
            const qtyInYieldUnit = convertUnits(parseFloat(ri.qty)||0, ri.unit, yieldUnit);
            const lc = costPerYieldUnit * (qtyInYieldUnit !== parseFloat(ri.qty) ? qtyInYieldUnit : (parseFloat(ri.qty)||0));
            return (
              <div key={ri.id||idx} style={{display:"flex",gap:8,alignItems:"flex-end",background:"rgba(55,138,221,0.06)",border:"1px solid rgba(55,138,221,0.2)",borderRadius:8,padding:"8px 10px"}}>
                <div style={{flex:2,display:"flex",flexDirection:"column",gap:4}}>
                  <label style={{...g.lbl,fontSize:9,color:"#378ADD"}}>🔪 {lang==="en"?"Prep recipe":"Prep recipe"}</label>
                  <select style={{...g.sel,width:"100%"}} value={ri.prep_id||""} onChange={e=>upI(idx,"prep_id",parseInt(e.target.value))}>
                    <option value="">{lang==="en"?"— Select prep —":"— Seleccionar prep —"}</option>
                    {prepRecipes.map(pr=><option key={pr.id} value={pr.id}>{lang==="en"&&pr.name_en?pr.name_en:pr.name} ({parseFloat(pr.total_yield)||pr.portions} {pr.yield_unit||pr.portion_unit})</option>)}
                  </select>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}><label style={{...g.lbl,fontSize:9}}>{t("quantity",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={ri.qty} onChange={e=>upI(idx,"qty",e.target.value)}/></div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}><label style={{...g.lbl,fontSize:9}}>{t("unit",lang)}</label>
                  <select style={{...g.sel,width:"100%"}} value={ri.unit} onChange={e=>upI(idx,"unit",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select>
                </div>
                <div style={{fontSize:11,color:lc>0?"#378ADD":TEXT2,fontWeight:600,paddingBottom:6,minWidth:50,textAlign:"right"}}>${lc.toFixed(3)}</div>
                <button style={{...g.btnD,marginBottom:1}} onClick={()=>rmI(idx)}><i className="ti ti-trash"/></button>
              </div>
            );
          }
          // Regular ingredient
          const ing=ingredients.find(i=>i.id===parseInt(ri.ing_id));
          const recipeUnit = ri.unit && ri.unit.trim() ? ri.unit : (ing?.unit_use || "");
          const recipeQtyNum = parseFloat(ri.qty)||0;
          let lc = 0;
          if (ing) {
            const ingUnitUse = ing.unit_use;
            const recipeUnitBase = UNIT_TO_BASE[recipeUnit] || 0;
            const ingUnitBase = UNIT_TO_BASE[ingUnitUse] || 0;
            const cpbu = getCostPerBaseUnit(ing);
            if (recipeUnitBase > 0 && ingUnitBase > 0 && WEIGHT_UNITS.has(recipeUnit) === WEIGHT_UNITS.has(ingUnitUse)) {
              const qtyInBase = recipeQtyNum * recipeUnitBase;
              const qtyInIngUnit = qtyInBase / ingUnitBase;
              lc = qtyInIngUnit * cpbu;
            } else {
              const converted = convertUnits(recipeQtyNum, recipeUnit, ingUnitUse);
              lc = converted * cpbu;
            }
          }
          return (
            <div key={ri.id||idx} style={{display:"flex",gap:8,alignItems:"flex-end",background:SURF2,borderRadius:8,padding:"8px 10px"}}>
              <div style={{flex:2,display:"flex",flexDirection:"column",gap:4}}><label style={{...g.lbl,fontSize:9}}>{t("tabIngredients",lang).slice(0,-1)}</label>
                <select style={{...g.sel,width:"100%"}} value={ri.ing_id} onChange={e=>{
                  const newId = parseInt(e.target.value);
                  const newIng = ingredients.find(i=>i.id===newId);
                  upI(idx,"ing_id",newId);
                  if(newIng) upI(idx,"unit",newIng.unit_use);
                }}>
                  <option value="">{t("selectIngredient",lang)}</option>
                  {ingredients.map(i=><option key={i.id} value={i.id}>{i.name} ({i.unit_use})</option>)}
                </select>
              </div>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}><label style={{...g.lbl,fontSize:9}}>{t("quantity",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={ri.qty} onChange={e=>upI(idx,"qty",e.target.value)}/></div>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}><label style={{...g.lbl,fontSize:9}}>{t("unit",lang)}</label>
                <select style={{...g.sel,width:"100%"}} value={ri.unit} onChange={e=>upI(idx,"unit",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select>
              </div>
              <div style={{fontSize:11,color:lc>0?ACCENT:TEXT2,fontWeight:600,paddingBottom:6,minWidth:50,textAlign:"right"}}>${lc.toFixed(3)}</div>
              <button style={{...g.btnD,marginBottom:1}} onClick={()=>rmI(idx)}><i className="ti ti-trash"/></button>
            </div>
          );
        })}
        {c.total>0&&<div style={{background:SURF2,borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontSize:11,fontWeight:700}}><i className="ti ti-calculator" style={{marginRight:6,color:ACCENT}}/>{t("costSummary",lang)}</div>
          {[[t("ingredientsCost",lang),`$${c.raw.toFixed(3)}`,TEXT],[t("waste",lang)+" ("+r.waste_pct+"%)",`+$${c.waste.toFixed(3)}`,"#EF9F27"],[t("total2",lang),`$${c.total.toFixed(3)}`,ACCENT],[t("byPortion",lang),`$${cpp.toFixed(3)}`,ACCENT]].map(([l,v,col],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,borderTop:i===2?`1px solid ${BDR}`:"none",paddingTop:i===2?6:0,fontWeight:i>=2?700:400}}>
              <span style={{color:TEXT2}}>{l}</span><span style={{color:col}}>{v}</span>
            </div>
          ))}
        </div>}
        {c.total>0&&<div style={{background:"rgba(200,49,43,0.04)",border:"1px solid rgba(200,49,43,0.10)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"flex",gap:6}}>
            {["price","margin"].map(m=>(
              <button key={m} style={{...(cm===m?g.btnP:{...g.btnS,color:TEXT2}),fontSize:11,padding:"5px 12px"}} onClick={()=>setCM(m)}>
                {m==="price"?<><i className="ti ti-tag"/>{t("priceToMargin",lang)}</>:<><i className="ti ti-trending-up"/>{t("marginToPrice",lang)}</>}
              </button>
            ))}
          </div>
          {cm==="price"&&<div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("sellingPrice",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={r.selling_price||""} onChange={e=>sr("selling_price",e.target.value)}/></div>
            {lm!==null&&<div style={{flex:1}}><div style={{fontSize:11,color:TEXT2,marginBottom:4}}>{t("margin",lang)}</div><div style={{fontSize:22,fontWeight:700,color:mColor(lm)}}>{lm.toFixed(1)}%</div></div>}
          </div>}
          {cm==="margin"&&<div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("targetMargin",lang)}</label><div style={{display:"flex",gap:5}}><input style={g.inp} type="text" inputMode="decimal" value={r.target_margin||""} onChange={e=>sr("target_margin",e.target.value)}/><span style={{color:TEXT2,fontSize:12,paddingBottom:6}}>%</span></div></div>
            {sug!==null&&<div style={{flex:1}}><div style={{fontSize:11,color:TEXT2,marginBottom:4}}>{t("suggestedPrice",lang)}</div><div style={{fontSize:22,fontWeight:700,color:ACCENT}}>${sug.toFixed(2)}</div></div>}
          </div>}
        </div>}
        </>}

        {activeTab==="steps"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
          {STAGES.map(stage=>{
            const stageSteps=(r.steps||[]).filter(s=>s.stage===stage.id);
            return (
              <div key={stage.id} style={{border:`1px solid ${BDR}`,borderRadius:10,overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",background:`${stage.color}11`,borderBottom:`1px solid ${BDR}`}}>
                  <span style={{fontSize:12,fontWeight:700,color:stage.color}}>{stage.icon} {lang==="en"&&stage.label_en?stage.label_en:stage.label}</span>
                  <button style={{...g.btnI,fontSize:10,padding:"4px 10px"}} onClick={()=>addStep(stage.id)}><i className="ti ti-plus" style={{fontSize:11}}/>{t("addStep",lang)}</button>
                </div>
                {stageSteps.length===0&&<div style={{padding:"12px 14px",fontSize:11,color:TEXT2,fontStyle:"italic"}}>{t("noStepsYet",lang)}</div>}
                {stageSteps.map((step,i)=>(
                  <div key={step.id} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 14px",borderBottom:`1px solid ${BDR}`}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:`${stage.color}22`,color:stage.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:4}}>{i+1}</div>
                    <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
                      <textarea style={{background:"#FBFBFB",border:`1px solid ${BDR}`,borderRadius:6,padding:"7px 10px",color:TEXT,fontSize:12,outline:"none",fontFamily:"inherit",resize:"vertical",minHeight:34}} placeholder={t("stepEsPlaceholder",lang)} value={step.text} onChange={e=>upStep(step.id,"text",e.target.value)}/>
                      <textarea style={{background:"#FBFBFB",border:`1px solid ${BDR}`,borderRadius:6,padding:"7px 10px",color:TEXT2,fontSize:12,outline:"none",fontFamily:"inherit",resize:"vertical",minHeight:34}} placeholder={t("stepEnPlaceholder",lang)} value={step.text_en||""} onChange={e=>upStep(step.id,"text_en",e.target.value)}/>
                    </div>
                    <input style={{...g.inp,width:70,flexShrink:0}} placeholder="min" value={step.time} onChange={e=>upStep(step.id,"time",e.target.value)}/>
                    <button style={{...g.btnD,padding:"6px 9px",flexShrink:0}} onClick={()=>rmStep(step.id)}><i className="ti ti-trash"/></button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>}

        {activeTab==="allergens"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:11,color:TEXT2}}>{t("selectAllergens",lang)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
            {ALLERGENS.map(a=>{
              const active=(r.allergens||[]).includes(a.id);
              return (
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:10,cursor:"pointer",border:`2px solid ${active?"#E24B4A":BDR}`,background:active?"rgba(226,75,74,0.08)":SURF2,transition:"all 0.15s"}} onClick={()=>toggleAllergen(a.id)}>
                  <span style={{fontSize:18}}>{a.icon}</span>
                  <span style={{fontSize:12,fontWeight:active?700:400,color:active?"#E24B4A":TEXT}}>{lang==="en"&&a.label_en?a.label_en:a.label}</span>
                  {active&&<i className="ti ti-check" style={{marginLeft:"auto",color:"#E24B4A",fontSize:14}}/>}
                </div>
              );
            })}
          </div>
          {r.allergens&&r.allergens.length>0&&(
            <div style={{background:"rgba(226,75,74,0.06)",border:"1px solid rgba(226,75,74,0.2)",borderRadius:8,padding:"10px 14px",fontSize:11,color:"#E24B4A"}}>
              <i className="ti ti-alert-triangle" style={{marginRight:6}}/>
              {t("contains",lang)}: <strong>{r.allergens.map(id=>{const a=ALLERGENS.find(x=>x.id===id);return a?(lang==="en"&&a.label_en?a.label_en:a.label):id;}).join(", ")}</strong>
            </div>
          )}
        </div>}

        <div style={{display:"flex",gap:10}}>
          <button style={{...g.btnP,flex:1,justifyContent:"center"}} onClick={()=>onSave({...r,selling_price:cm==="margin"&&sug?sug.toFixed(2):r.selling_price})}><i className="ti ti-check"/>{t("saveRecipe",lang)}</button>
          {!isNew&&<button style={g.btnI} onClick={()=>printRecipe(r,ingredients,lang)}><i className="ti ti-file-download"/>{t("downloadPdf",lang)}</button>}
          <button style={g.btnS} onClick={onClose}>{t("cancel",lang)}</button>
        </div>
      </div>
    </div>
  );
}

// ─── INVOICES ────────────────────────────────────────────────────────────────
function MonthAccordion({group, lang, selectedInv, setSelectedInv, removeInvoice, g, t, ACCENT, BDR, SURF2}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderBottom:`1px solid ${BDR}`}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",cursor:"pointer",background:open?"rgba(200,49,43,0.03)":"transparent"}} onClick={()=>setOpen(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <i className={`ti ${open?"ti-chevron-down":"ti-chevron-right"}`} style={{fontSize:12,color:ACCENT}}/>
          <span style={{fontSize:13,fontWeight:600}}>{group.label}</span>
          <span style={{fontSize:11,color:TEXT2,background:SURF2,padding:"2px 8px",borderRadius:99}}>{group.invoices.length} {lang==="en"?"invoices":"facturas"}</span>
        </div>
        <span style={{fontSize:12,fontWeight:700,color:ACCENT}}>${group.total.toFixed(2)}</span>
      </div>
      {open&&<div style={{borderTop:`1px solid ${BDR}`}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr>
            <th style={g.th}>{t("date",lang)}</th><th style={g.th}>{t("supplier",lang)}</th>
            <th style={g.th}>{t("items",lang)}</th><th style={g.th}>{t("totalCol",lang)}</th>
            <th style={g.th}>{t("actions",lang)}</th>
          </tr></thead>
          <tbody>{group.invoices.map(inv=>(
            <React.Fragment key={inv.id}>
              <tr onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={g.td}>{inv.date}</td><td style={g.td}>{inv.supplier}</td>
                <td style={g.td}>{inv.items} {lang==="en"?"ing.":"ing."}</td>
                <td style={{...g.td,color:ACCENT,fontWeight:700}}>{inv.total}</td>
                <td style={g.td}>
                  <div style={{display:"flex",gap:5}}>
                    {inv.line_items&&inv.line_items.length>0&&(
                      <button style={g.btnI} onClick={()=>setSelectedInv(selectedInv?.id===inv.id?null:inv)}>
                        <i className="ti ti-eye" style={{fontSize:12}}/>{selectedInv?.id===inv.id?(lang==="en"?"Hide":"Ocultar"):(lang==="en"?"View":"Ver")}
                      </button>
                    )}
                    <button style={g.btnD} onClick={()=>removeInvoice(inv)}>
                      <i className="ti ti-trash" style={{fontSize:12}}/>{t("delete",lang)}
                    </button>
                  </div>
                </td>
              </tr>
              {selectedInv?.id===inv.id&&inv.line_items&&inv.line_items.length>0&&(
                <tr><td colSpan={5} style={{padding:14,background:"rgba(200,49,43,0.02)"}}>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:10,color:ACCENT}}>{inv.supplier} · {inv.date}</div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                      <thead><tr>
                        <th style={g.th}>{t("ingredient",lang)}</th><th style={g.th}>{t("qty",lang)}</th>
                        <th style={g.th}>{t("unit",lang)}</th><th style={g.th}>{lang==="en"?"Pack size":"Tamaño"}</th>
                        <th style={g.th}>{t("unitPrice",lang)}</th><th style={g.th}>{t("totalCol",lang)}</th>
                      </tr></thead>
                      <tbody>
                        {inv.line_items.map((item,i)=>(
                          <tr key={i} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                            <td style={{...g.td,fontWeight:500}}>{item.name}</td>
                            <td style={g.td}>{item.qty}</td>
                            <td style={g.td}><span style={g.badge("gray")}>{item.unit_purchase||item.unit}</span></td>
                            <td style={g.td}>{item.pack_size?`${item.pack_size} ${item.unit_use}`:"—"}</td>
                            <td style={g.td}>${parseFloat(item.unit_price||0).toFixed(2)}</td>
                            <td style={{...g.td,color:ACCENT,fontWeight:700}}>${parseFloat(item.total||0).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td></tr>
              )}
            </React.Fragment>
          ))}</tbody>
        </table>
      </div>}
    </div>
  );
}

function Invoices() {
  const { invoices, setInvoices, ingredients, setIngredients, lang } = useApp();
  const [activeTab, setActiveTab] = useState("upload");
  const [drag,setDrag]=useState(false);
  const [file,setFile]=useState(null);
  const [prev,setPrev]=useState(null);
  const [st,setSt]=useState("idle");
  const [pct,setPct]=useState(0);
  const [msg,setMsg]=useState("");
  const [ext,setExt]=useState([]);
  const [selectedInv, setSelectedInv] = useState(null);
  const ref=useRef();
  const blankItem = {id:Date.now(),name:"",category:"otros",qty:"",unit_purchase:"lb",unit_use:"lb",unit_inventory:"lb",pack_size:"",unit_price:"",total:"",supplier:"",grouped:false};
  const [manualSupplier, setManualSupplier] = useState("");
  const [manualDate, setManualDate] = useState(new Date().toISOString().split("T")[0]);
  const [manualItems, setManualItems] = useState([{...blankItem, id:Date.now()}]);
  const addManualItem = () => setManualItems(p=>[...p,{...blankItem,id:Date.now()+Math.random()}]);
  const updManual = (id,k,v) => setManualItems(p=>p.map(i=>i.id===id?{...i,[k]:v}:i));
  const rmManual = (id) => setManualItems(p=>p.filter(i=>i.id!==id));

  const PROMPT=`Analiza esta factura de restaurante/supermercado. Extrae TODOS los productos alimenticios.\n\nREGLAS IMPORTANTES:\n- "qty": cantidad de empaques/unidades compradas (ej: 2 cases, 4 bags)\n- "unit": unidad de compra del empaque (case, bag, box, lb, oz, ct, etc)\n- "pack_size": peso o volumen DENTRO de cada empaque en la unidad base (ej: si es "2 cases of 40lb" → pack_size: 40). Si no aplica o no se menciona, pon null.\n- "unit_price": precio por unidad/empaque\n- "total": total de esa línea\n- "category": categoría del ingrediente. USA EXACTAMENTE uno de estos valores: carnes, lacteos, vegetales, panaderia, condimentos, aceites, otros\n  * carnes = carnes, aves, mariscos, proteínas, embutidos\n  * lacteos = queso, leche, crema, mantequilla, yogur, huevos\n  * vegetales = verduras, frutas, hongos, hierbas frescas\n  * panaderia = pan, tortillas, harinas, arroz, pasta, granos\n  * condimentos = salsas, especias, aderezos, vinagres, azúcar, sal\n  * aceites = aceites, mantecas, grasas, líquidos de cocina\n  * otros = cualquier cosa que no encaje en las anteriores\n- Agrupa productos duplicados sumando cantidades (grouped:true)\n- Detecta proveedor y fecha si aparecen\n\nResponde SOLO JSON sin markdown ni texto extra:\n{"supplier":"...","date":"YYYY-MM-DD","items":[{"name":"...","qty":1.0,"unit":"lb","unit_price":0.0,"total":0.0,"grouped":false,"pack_size":null,"category":"otros"}]}\n\nNormaliza unit a uno de estos: lb, oz, kg, g, L, ml, fl oz, gal, cup, tbsp, tsp, ct, box, bag, bunch, can, bottle, block, case`;

  function hFile(f){if(!f)return;setFile(f);setSt("idle");setExt([]);setMsg("");if(f.type.startsWith("image/")){const r=new FileReader();r.onload=e=>setPrev(e.target.result);r.readAsDataURL(f);}else setPrev(null);}

  async function process(){
    if(!file)return;setSt("processing");setPct(10);setMsg(lang==="en"?"Reading file...":"Leyendo archivo...");
    try{
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file)});
      setPct(40);setMsg(lang==="en"?"AI is analyzing your invoice...":"La IA está analizando tu factura...");
      const content=file.type.startsWith("image/")?[{type:"image",source:{type:"base64",media_type:file.type,data:b64}},{type:"text",text:PROMPT}]:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:b64}},{type:"text",text:PROMPT}];
      const res=await fetch("https://chefcost-proxy.patty-hustlellc.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:2000,messages:[{role:"user",content}]})});
      const data=await res.json();
      if(!res.ok){setSt("idle");setMsg(`Error API: ${data.error?.message||JSON.stringify(data)}`);return;}
      setPct(80);setMsg(lang==="en"?"Processing...":"Procesando...");
      const text=data.content?.map(b=>b.text||"").join("")||"";
      let jsonText = text.replace(/```json|```/g,"").trim();
      const firstBrace = jsonText.indexOf("{");
      const lastBrace = jsonText.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1) jsonText = jsonText.substring(firstBrace, lastBrace + 1);
      const parsed=JSON.parse(jsonText);
      setPct(100);setMsg(lang==="en"?"Done!":"¡Listo!");
      setExt((parsed.items||[]).map((item,i)=>({...item,id:i,supplier:parsed.supplier||"Desconocido",date:parsed.date||new Date().toISOString().split("T")[0],unit_purchase:item.unit||"ct",unit_use:item.unit||"ct",unit_inventory:item.unit||"ct",pack_size:item.pack_size||null})));
      setSt("review");
    }catch(e){setSt("idle");setMsg(`Error: ${e.message||e}`);}
  }

  async function confirmInvoice(itemsToConfirm, supplierName, invoiceDate){
    const supplier = supplierName || itemsToConfirm[0]?.supplier || "Desconocido";
    const total = "$"+itemsToConfirm.reduce((s,i)=>s+(parseFloat(i.total)||0),0).toFixed(2);
    const { data: invData, error: invError } = await supabase.from("invoices").insert({
      date: fixDate(invoiceDate || itemsToConfirm[0]?.date || new Date().toISOString().split("T")[0]),
      supplier, items: itemsToConfirm.length, total, line_items: itemsToConfirm,
    }).select().single();
    if (invError) { alert("Error guardando factura: "+invError.message); return; }
    setInvoices(p=>[invData, ...p].sort((a,b)=>new Date(b.date)-new Date(a.date)));
    const updatedIngredients=[...ingredients];
    for (const item of itemsToConfirm) {
      const ex=updatedIngredients.find(i=>i.name.toLowerCase()===item.name.toLowerCase());
      const qtyReceived=parseFloat(item.qty)||0;
      const packSize=parseFloat(item.pack_size)||0;
      const unitsReceived=packSize>0?qtyReceived*packSize:qtyReceived;
      if (ex) {
        const updateFields = { prev_price:ex.price, price:parseFloat(item.unit_price)||ex.price, pack_size:item.pack_size?parseFloat(item.pack_size):ex.pack_size, stock:(parseFloat(ex.stock)||0)+unitsReceived };
        const { error } = await supabase.from("ingredients").update(updateFields).eq("id", ex.id);
        if (!error) { const idx=updatedIngredients.findIndex(i=>i.id===ex.id); updatedIngredients[idx]={...ex,...updateFields}; }
      } else {
        const insertFields = { name:item.name, category:item.category||"otros", supplier:item.supplier||supplier, unit_purchase:item.unit_purchase, unit_use:item.unit_use, unit_inventory:item.unit_inventory, price:parseFloat(item.unit_price)||0, prev_price:parseFloat(item.unit_price)||0, pack_size:item.pack_size?parseFloat(item.pack_size):null, stock:unitsReceived, min_stock:5 };
        const { data, error } = await supabase.from("ingredients").insert(insertFields).select().single();
        if (!error && data) updatedIngredients.push(data);
      }
    }
    setIngredients(updatedIngredients);
    setSt("saved"); setFile(null); setPrev(null); setExt([]);
    setManualItems([{...blankItem, id:Date.now()}]); setManualSupplier(""); setManualDate(new Date().toISOString().split("T")[0]);
  }

  const upd=(id,k,v)=>setExt(p=>p.map(i=>i.id===id?{...i,[k]:v}:i));
  const sortedInvoices = [...invoices].sort((a,b)=>new Date(b.date)-new Date(a.date));

  function fixDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split("T")[0];
    // If already in YYYY-MM-DD format with 4-digit year, validate it
    const match4 = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match4) {
      const year = parseInt(match4[1]);
      // If year looks wrong (before 2020 or too far future), use current year
      if (year < 2020 || year > 2030) {
        const now = new Date();
        return `${now.getFullYear()}-${match4[2]}-${match4[3]}`;
      }
      return dateStr;
    }
    // Try to parse other formats
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
    const year = d.getFullYear();
    if (year < 2020 || year > 2030) {
      const now = new Date();
      return `${now.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    }
    return d.toISOString().split("T")[0];
  }

  async function removeInvoice(inv) {
    if (!window.confirm(lang==="en"?`Delete invoice from ${inv.supplier} (${inv.date})? This will revert the stock of all ingredients in this invoice.`:`¿Eliminar factura de ${inv.supplier} (${inv.date})? Esto revertirá el stock de todos los ingredientes de esta factura.`)) return;
    // Revert stock for each line item
    if (inv.line_items && inv.line_items.length > 0) {
      const updatedIngredients = [...ingredients];
      for (const item of inv.line_items) {
        const ex = updatedIngredients.find(i=>i.name.toLowerCase()===item.name.toLowerCase());
        if (!ex) continue;
        const qtyReceived = parseFloat(item.qty)||0;
        const packSize = parseFloat(item.pack_size)||0;
        const unitsToRevert = packSize>0?qtyReceived*packSize:qtyReceived;
        const newStock = Math.max(0, (parseFloat(ex.stock)||0) - unitsToRevert);
        const { error } = await supabase.from("ingredients").update({ stock: newStock }).eq("id", ex.id);
        if (!error) {
          const idx = updatedIngredients.findIndex(i=>i.id===ex.id);
          updatedIngredients[idx] = {...ex, stock: newStock};
        }
      }
      setIngredients(updatedIngredients);
    }
    // Delete invoice record
    const { error } = await supabase.from("invoices").delete().eq("id", inv.id);
    if (error) { alert("Error eliminando factura: "+error.message); return; }
    setInvoices(p=>p.filter(i=>i.id!==inv.id));
    if (selectedInv?.id===inv.id) setSelectedInv(null);
  }

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:4,background:SURF2,borderRadius:10,padding:4,width:"fit-content"}}>
        {[["upload",lang==="en"?"📄 Scan invoice":"📄 Escanear factura"],["manual",lang==="en"?"✏️ Manual entry":"✏️ Entrada manual"]].map(([id,label])=>(
          <button key={id} style={{background:activeTab===id?SURF:"transparent",color:activeTab===id?TEXT:TEXT2,border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:activeTab===id?600:400,cursor:"pointer"}} onClick={()=>{setActiveTab(id);setSt("idle");setFile(null);setPrev(null);setExt([]);setMsg("");}}>
            {label}
          </button>
        ))}
      </div>

      {activeTab==="upload"&&<>
        {st!=="review"&&st!=="saved"&&<>
          <div style={{border:`2px dashed ${drag?ACCENT:BDR}`,borderRadius:12,padding:"36px 20px",textAlign:"center",cursor:"pointer",background:drag?"rgba(200,49,43,0.03)":SURF,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}
            onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);hFile(e.dataTransfer.files[0]);}} onClick={()=>ref.current.click()}>
            <input ref={ref} type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>hFile(e.target.files[0])}/>
            <i className="ti ti-cloud-upload" style={{fontSize:40,color:ACCENT,opacity:0.8}}/>
            <div style={{fontSize:14,fontWeight:600}}>{file?file.name:t("dropHere",lang)}</div>
            <div style={{fontSize:12,color:TEXT2}}>{t("photoOrPdf",lang)}</div>
            {!file&&<div style={{display:"flex",gap:8}}><span style={g.badge("info")}>📸 {lang==="en"?"Photo":"Foto"}</span><span style={g.badge("info")}>📄 PDF</span></div>}
          </div>
          {prev&&<div style={g.card}><div style={{padding:14,textAlign:"center"}}><img src={prev} alt="Invoice" style={{maxWidth:"100%",maxHeight:200,borderRadius:8,objectFit:"contain"}}/></div></div>}
          {file&&st!=="processing"&&<div style={{display:"flex",gap:10}}>
            <button style={g.btnP} onClick={process}><i className="ti ti-robot"/>{t("analyzeAI",lang)}</button>
            <button style={g.btnS} onClick={()=>{setFile(null);setPrev(null);setMsg("");}}>{t("cancel",lang)}</button>
          </div>}
          {st==="processing"&&<div style={{...g.card,padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:18,height:18,border:`2px solid ${BDR}`,borderTop:`2px solid ${ACCENT}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
              <span style={{fontSize:12,color:TEXT2}}>{msg}</span>
            </div>
            <div style={{background:SURF2,borderRadius:99,height:3}}><div style={{height:3,width:`${pct}%`,background:ACCENT,borderRadius:99,transition:"width 0.4s"}}/></div>
          </div>}
          {msg&&st==="idle"&&<div style={{fontSize:12,color:"#E24B4A",padding:"8px 12px",background:"rgba(226,75,74,0.08)",borderRadius:8}}>{msg}</div>}
        </>}
        {st==="review"&&<div style={g.card}>
          <div style={{padding:"11px 16px",borderBottom:`1px solid ${BDR}`,background:SURF2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,fontWeight:600}}><i className="ti ti-check" style={{marginRight:6,color:ACCENT}}/>{t("reviewItems",lang)} — {ext.length} {t("items",lang)}</span>
            <span style={g.badge("info")}>{ext[0]?.supplier}</span>
          </div>
          <div style={{padding:"8px 14px",borderBottom:`1px solid ${BDR}`,background:"rgba(200,49,43,0.03)",fontSize:11,color:ACCENT}}>
            <i className="ti ti-info-circle" style={{marginRight:6}}/>{t("willBeAdded",lang)}
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>
                <th style={g.th}>{t("ingredient",lang)}</th><th style={g.th}>{t("category",lang)}</th>
                <th style={g.th}>{t("qty",lang)}</th><th style={g.th}>{t("unitPurchase",lang)}</th>
                <th style={g.th}>{t("unitUse",lang)}</th><th style={g.th}>{t("unitInventory",lang)}</th>
                <th style={g.th}>{lang==="en"?"Pack size":"Tamaño empaque"}</th>
                <th style={g.th}>{t("unitPrice",lang)}</th><th style={g.th}>{lang==="en"?"$/base unit":"$/unidad base"}</th>
                <th style={g.th}>{t("totalCol",lang)}</th><th style={g.th}>{t("action",lang)}</th>
              </tr></thead>
              <tbody>
                {ext.map(item=>{
                  const packSize=parseFloat(item.pack_size)||0;
                  const unitPrice=parseFloat(item.unit_price)||0;
                  const costPerBase=packSize>0?(unitPrice/packSize).toFixed(3):null;
                  return (
                    <tr key={item.id}>
                      <td style={g.td}><input style={{...g.inp,width:130}} value={item.name} onChange={e=>upd(item.id,"name",e.target.value)}/>{item.grouped&&<span style={{fontSize:9,background:"rgba(200,49,43,0.08)",color:ACCENT,padding:"1px 5px",borderRadius:99,marginLeft:5,fontWeight:700}}>{t("grouped",lang)}</span>}</td>
                      <td style={g.td}><select style={{...g.sel,width:100}} value={item.category||"otros"} onChange={e=>upd(item.id,"category",e.target.value)}>{CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}</select></td>
                      <td style={g.td}><input style={{...g.inp,width:55}} type="text" inputMode="decimal" value={item.qty} onChange={e=>upd(item.id,"qty",e.target.value)}/></td>
                      <td style={g.td}><select style={{...g.sel,width:78}} value={item.unit_purchase} onChange={e=>upd(item.id,"unit_purchase",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></td>
                      <td style={g.td}><select style={{...g.sel,width:78}} value={item.unit_use} onChange={e=>upd(item.id,"unit_use",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></td>
                      <td style={g.td}><select style={{...g.sel,width:78}} value={item.unit_inventory} onChange={e=>upd(item.id,"unit_inventory",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></td>
                      <td style={g.td}><div style={{display:"flex",alignItems:"center",gap:4}}><input style={{...g.inp,width:55}} type="text" inputMode="decimal" placeholder="0" value={item.pack_size||""} onChange={e=>upd(item.id,"pack_size",e.target.value)}/><span style={{fontSize:10,color:TEXT2}}>{item.unit_use}</span></div></td>
                      <td style={g.td}><input style={{...g.inp,width:65}} type="text" inputMode="decimal" value={item.unit_price} onChange={e=>upd(item.id,"unit_price",e.target.value)}/></td>
                      <td style={g.td}>{costPerBase?<span style={{color:ACCENT,fontWeight:700}}>${costPerBase}</span>:<span style={{color:TEXT2,fontSize:10}}>{lang==="en"?"Add pack size":"Agrega tamaño"}</span>}</td>
                      <td style={{...g.td,color:ACCENT,fontWeight:700}}>${parseFloat(item.total||0).toFixed(2)}</td>
                      <td style={g.td}><button style={g.btnD} onClick={()=>setExt(p=>p.filter(i=>i.id!==item.id))}><i className="ti ti-trash" style={{fontSize:12}}/>{t("delete",lang)}</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:"12px 16px",borderTop:`1px solid ${BDR}`,display:"flex",gap:10}}>
            <button style={g.btnP} onClick={()=>confirmInvoice(ext,ext[0]?.supplier,ext[0]?.date)}><i className="ti ti-check"/>{t("confirmSave",lang)} {ext.length} {t("totalIngredients",lang).toLowerCase()}</button>
            <button style={g.btnS} onClick={()=>{setSt("idle");setExt([]);setFile(null);setPrev(null);}}>{t("cancel",lang)}</button>
          </div>
        </div>}
        {st==="saved"&&<div style={{...g.card,padding:32,textAlign:"center"}}>
          <i className="ti ti-circle-check" style={{fontSize:48,color:ACCENT,display:"block",marginBottom:12}}/>
          <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>{t("savedInvoice",lang)}</div>
          <div style={{fontSize:12,color:TEXT2,marginBottom:20}}>{t("ingredientsUpdated",lang)}</div>
          <button style={g.btnP} onClick={()=>setSt("idle")}><i className="ti ti-plus"/>{t("uploadAnother",lang)}</button>
        </div>}
      </>}

      {activeTab==="manual"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{...g.card,padding:16,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:13,fontWeight:700}}>{lang==="en"?"Invoice details":"Datos de la factura"}</div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:2,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("supplier",lang)}</label><input style={g.inp} placeholder={lang==="en"?"Supplier name":"Nombre del proveedor"} value={manualSupplier} onChange={e=>setManualSupplier(e.target.value)}/></div>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("date",lang)}</label><input style={g.inp} type="date" value={manualDate} onChange={e=>setManualDate(e.target.value)}/></div>
          </div>
        </div>
        <div style={g.card}>
          <div style={{padding:"11px 16px",borderBottom:`1px solid ${BDR}`,background:SURF2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,fontWeight:600}}>{lang==="en"?"Ingredients":"Ingredientes"} ({manualItems.length})</span>
            <button style={g.btnP} onClick={addManualItem}><i className="ti ti-plus"/>{t("add",lang)}</button>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>
                <th style={g.th}>{t("ingredient",lang)}</th><th style={g.th}>{t("category",lang)}</th>
                <th style={g.th}>{t("qty",lang)}</th><th style={g.th}>{t("unitPurchase",lang)}</th>
                <th style={g.th}>{t("unitUse",lang)}</th><th style={g.th}>{t("unitInventory",lang)}</th>
                <th style={g.th}>{lang==="en"?"Pack size":"Tamaño empaque"}</th>
                <th style={g.th}>{t("unitPrice",lang)}</th><th style={g.th}>{t("totalCol",lang)}</th>
                <th style={g.th}></th>
              </tr></thead>
              <tbody>
                {manualItems.map(item=>{
                  const total=(parseFloat(item.qty)||0)*(parseFloat(item.unit_price)||0);
                  return (
                    <tr key={item.id}>
                      <td style={g.td}><input style={{...g.inp,width:130}} placeholder={lang==="en"?"Item name":"Nombre"} value={item.name} onChange={e=>updManual(item.id,"name",e.target.value)}/></td>
                      <td style={g.td}><select style={{...g.sel,width:100}} value={item.category} onChange={e=>updManual(item.id,"category",e.target.value)}>{CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}</select></td>
                      <td style={g.td}><input style={{...g.inp,width:55}} type="text" inputMode="decimal" placeholder="0" value={item.qty} onChange={e=>updManual(item.id,"qty",e.target.value)}/></td>
                      <td style={g.td}><select style={{...g.sel,width:78}} value={item.unit_purchase} onChange={e=>updManual(item.id,"unit_purchase",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></td>
                      <td style={g.td}><select style={{...g.sel,width:78}} value={item.unit_use} onChange={e=>updManual(item.id,"unit_use",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></td>
                      <td style={g.td}><select style={{...g.sel,width:78}} value={item.unit_inventory} onChange={e=>updManual(item.id,"unit_inventory",e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></td>
                      <td style={g.td}><div style={{display:"flex",alignItems:"center",gap:4}}><input style={{...g.inp,width:55}} type="text" inputMode="decimal" placeholder="0" value={item.pack_size||""} onChange={e=>updManual(item.id,"pack_size",e.target.value)}/><span style={{fontSize:10,color:TEXT2}}>{item.unit_use}</span></div></td>
                      <td style={g.td}><input style={{...g.inp,width:65}} type="text" inputMode="decimal" placeholder="0.00" value={item.unit_price} onChange={e=>updManual(item.id,"unit_price",e.target.value)}/></td>
                      <td style={{...g.td,color:ACCENT,fontWeight:700}}>${total.toFixed(2)}</td>
                      <td style={g.td}><button style={g.btnD} onClick={()=>rmManual(item.id)}><i className="ti ti-trash"/></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:"12px 16px",borderTop:`1px solid ${BDR}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:ACCENT,fontWeight:700}}>{lang==="en"?"Est. total:":"Total est.:"} ${manualItems.reduce((s,i)=>s+(parseFloat(i.qty)||0)*(parseFloat(i.unit_price)||0),0).toFixed(2)}</span>
            <button style={g.btnP} onClick={async()=>{
              const prepared=manualItems.filter(i=>i.name.trim()).map(i=>({...i,supplier:manualSupplier,date:manualDate,unit_price:parseFloat(i.unit_price)||0,total:(parseFloat(i.qty)||0)*(parseFloat(i.unit_price)||0)}));
              if(prepared.length===0){alert(lang==="en"?"Add at least one ingredient":"Agrega al menos un ingrediente");return;}
              await confirmInvoice(prepared,manualSupplier,manualDate);
            }}><i className="ti ti-check"/>{t("confirmSave",lang)}</button>
          </div>
        </div>
      </div>}

      <div style={g.card}>
        <div style={{padding:"11px 16px",borderBottom:`1px solid ${BDR}`,background:SURF2,fontSize:12,fontWeight:600}}><i className="ti ti-history" style={{marginRight:6}}/>{t("previousInvoices",lang)}</div>
        {(()=>{
          // Group invoices by month
          const MONTHS_ES=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
          const MONTHS_EN=["January","February","March","April","May","June","July","August","September","October","November","December"];
          const groups={};
          sortedInvoices.forEach(inv=>{
            const d=new Date(inv.date+"T00:00:00");
            const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
            const label=`${lang==="en"?MONTHS_EN[d.getMonth()]:MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
            if(!groups[key]) groups[key]={label,invoices:[],total:0};
            groups[key].invoices.push(inv);
            groups[key].total+=parseFloat((inv.total||"$0").replace("$",""))||0;
          });
          return Object.entries(groups).sort((a,b)=>b[0].localeCompare(a[0])).map(([key,group])=>(
            <MonthAccordion key={key} group={group} lang={lang} selectedInv={selectedInv} setSelectedInv={setSelectedInv} removeInvoice={removeInvoice} g={g} t={t} ACCENT={ACCENT} BDR={BDR} SURF2={SURF2}/>
          ));
        })()}
        {sortedInvoices.length===0&&<div style={{padding:20,textAlign:"center",fontSize:12,color:TEXT2}}>{lang==="en"?"No invoices yet":"Sin facturas todavía"}</div>}
      </div>
    </div>
  );
}


function Inventory() {
  const { ingredients, setIngredients, lang } = useApp();
  const [mode,setMode]=useState("view");
  const [counts,setCounts]=useState({});
  const [saved,setSaved]=useState(null);
  const [history,setHistory]=useState([]); // [{date, totalVal}, ...] most recent first
  const [fCat,setFC]=useState("all");

  useEffect(() => {
    async function loadHistory() {
      const { data, error } = await supabase.from("inventory_counts").select("*").order("count_date", { ascending: false }).limit(10);
      if (!error && data && data.length > 0) {
        setHistory(data.map(d => ({ date: new Date(d.count_date).toLocaleDateString(), totalVal: d.total_value })));
        setSaved(data[0].counts);
        setMode("saved");
      }
    }
    loadHistory();
  }, []);

  function start(){const b={};ingredients.forEach(i=>{b[i.id]={sealed:"",loose:""}});setCounts(b);setMode("counting");}
  function upd(id,k,v){setCounts(p=>({...p,[id]:{...p[id],[k]:v}}));}
  async function save(){
    const snap={...counts};
    setSaved(snap);
    // Calculate total value of this count before updating stock
    const newTotalVal=ingredients.reduce((s,ing)=>{
      const c=snap[ing.id];
      if(!c) return s;
      const sealed=parseFloat(c.sealed)||0;
      const loose=parseFloat(c.loose)||0;
      const totUnits=(ing.pack_size?sealed*ing.pack_size:sealed)+loose;
      const unitCost=getCostPerBaseUnit(ing);
      return s+(totUnits*unitCost);
    },0);

    // Save count snapshot to Supabase
    const { error: countError } = await supabase.from("inventory_counts").insert({
      total_value: newTotalVal, counts: snap
    });
    if (countError) { alert("Error guardando conteo: "+countError.message); return; }
    setHistory(p=>[{date:new Date().toLocaleDateString(),totalVal:newTotalVal},...p]);

    // Update stock in Ingredients (both locally and in Supabase)
    const updatedIngredients=[];
    for (const ing of ingredients) {
      const c=snap[ing.id];
      if(!c) { updatedIngredients.push(ing); continue; }
      const sealed=parseFloat(c.sealed)||0;
      const loose=parseFloat(c.loose)||0;
      const newStock=(ing.pack_size?sealed*ing.pack_size:sealed)+loose;
      const { error } = await supabase.from("ingredients").update({ stock: newStock }).eq("id", ing.id);
      updatedIngredients.push(error ? ing : {...ing, stock:newStock});
    }
    setIngredients(updatedIngredients);
    setMode("saved");
  }
  const dc=mode==="saved"?saved:mode==="counting"?counts:null;
  function tot(ing,c){const s=parseFloat(c?.sealed)||0;const l=parseFloat(c?.loose)||0;return(ing.pack_size?s*ing.pack_size:s)+l;}
  function val(ing,c){return tot(ing,c)*getCostPerBaseUnit(ing);}
  const totalVal=ingredients.reduce((s,ing)=>{const c=dc?.[ing.id];return c?s+val(ing,c):s;},0);
  const prevVal=mode==="saved"?(history[1]?.totalVal??null):null;
  const valDiff=prevVal!==null?totalVal-prevVal:null;
  const valDiffPct=prevVal!==null&&prevVal>0?((valDiff/prevVal)*100):null;
  const filtered=fCat==="all"?ingredients:ingredients.filter(i=>i.category===fCat);
  const grouped=CAT_ING.map(c=>({...c,items:filtered.filter(i=>i.category===c.id)})).filter(c=>c.items.length>0);
  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        {mode==="view"&&<><span style={{flex:1,fontSize:13,color:TEXT2}}>{saved?t("lastCountSaved",lang):t("noInventoryYet",lang)}</span><button style={g.btnP} onClick={start}><i className="ti ti-clipboard-list"/>{t("startCount",lang)}</button></>}
        {mode==="counting"&&<><span style={{flex:1,fontSize:13,color:ACCENT,fontWeight:600}}><i className="ti ti-clipboard-list" style={{marginRight:6}}/>{t("countInProgress",lang)}</span><button style={g.btnP} onClick={save}><i className="ti ti-device-floppy"/>{t("save",lang)}</button><button style={g.btnS} onClick={()=>{setCounts({});setMode("view");}}>{t("cancel",lang)}</button></>}
        {mode==="saved"&&<><span style={{flex:1,fontSize:13,color:ACCENT,fontWeight:600}}>✓ {lang==="en"?"Saved":"Guardado"} — {t("totalValue",lang)}: <strong>${totalVal.toFixed(2)}</strong></span><button style={g.btnP} onClick={start}><i className="ti ti-refresh"/>{t("newCount",lang)}</button></>}
      </div>
      {mode==="saved"&&prevVal!==null&&(
        <div style={{background:SURF,border:`1px solid ${BDR}`,borderRadius:12,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:28}}>
            <div><div style={{fontSize:10,color:TEXT2}}>{lang==="en"?"Previous count":"Conteo anterior"}</div><div style={{fontSize:16,fontWeight:700,color:TEXT2}}>${prevVal.toFixed(2)}</div></div>
            <div><div style={{fontSize:10,color:TEXT2}}>{lang==="en"?"Current count":"Conteo actual"}</div><div style={{fontSize:16,fontWeight:700,color:ACCENT}}>${totalVal.toFixed(2)}</div></div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:TEXT2}}>{lang==="en"?"Change":"Variación"}</div>
            <div style={{fontSize:20,fontWeight:700,color:valDiff>=0?ACCENT:"#E24B4A",display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end"}}>
              <i className={`ti ${valDiff>=0?"ti-trending-up":"ti-trending-down"}`}/>
              {valDiff>=0?"+":""}{valDiff.toFixed(2)} ({valDiffPct>=0?"+":""}{valDiffPct.toFixed(1)}%)
            </div>
          </div>
        </div>
      )}
      {mode==="saved"&&prevVal===null&&history.length===1&&(
        <div style={{background:SURF2,border:`1px solid ${BDR}`,borderRadius:10,padding:"10px 16px",fontSize:11,color:TEXT2}}>
          <i className="ti ti-info-circle" style={{marginRight:6}}/>{lang==="en"?"This is your first count — comparison will appear starting with the next one.":"Este es tu primer conteo — la comparación aparecerá a partir del próximo."}
        </div>
      )}
      {(mode==="counting"||mode==="saved")&&<>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10}}>
          {[
            {label:t("totalValue",lang),value:`$${totalVal.toFixed(2)}`,color:ACCENT},
            {label:t("counted",lang),value:`${Object.values(counts).filter(c=>c.sealed!==""||c.loose!=="").length}/${ingredients.length}`,color:TEXT},
            {label:t("outOfStock",lang),value:ingredients.filter(i=>{const c=dc?.[i.id];return c&&tot(i,c)===0}).length,color:"#E24B4A"},
          ].map((s,i)=>(
            <div key={i} style={{background:SURF,border:`1px solid ${BDR}`,borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:10,color:TEXT2,marginBottom:4}}>{s.label}</div>
              <div style={{fontSize:20,fontWeight:700,color:s.color}}>{s.value}</div>
            </div>
          ))}
        </div>
        <select style={g.sel} value={fCat} onChange={e=>setFC(e.target.value)}>
          <option value="all">{t("all",lang)}</option>
          {CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}
        </select>
        {grouped.map(cat=>(
          <div key={cat.id} style={g.card}>
            <div style={g.catH(cat.color)}><i className="ti ti-box" style={{fontSize:13}}/>{lang==="en"?cat.label_en:cat.label}<span style={{marginLeft:"auto",fontSize:11}}>Est. ${cat.items.reduce((s,ing)=>{const c=dc?.[ing.id];return s+(c?val(ing,c):0);},0).toFixed(2)}</span></div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><th style={g.th}>{t("ingredient",lang)}</th><th style={g.th}>$/{lang==="en"?"unit":"unidad"}</th><th style={g.th}>{t("sealedPacks",lang)}</th><th style={g.th}>{t("loosePacks",lang)}</th><th style={g.th}>{t("total",lang)}</th><th style={g.th}>{t("valueCol",lang)} $</th></tr></thead>
                <tbody>
                  {cat.items.map(ing=>{
                    const c=dc?.[ing.id]||{sealed:"",loose:""};
                    const t2=tot(ing,c);const v=val(ing,c);
                    const pu=getCostPerBaseUnit(ing);
                    return (
                      <tr key={ing.id} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{...g.td,fontWeight:500}}>{ing.name}{ing.pack_size&&<div style={{fontSize:9,color:TEXT2}}>1 {ing.unit_purchase} = {ing.pack_size} {ing.unit_use}</div>}</td>
                        <td style={{...g.td,color:TEXT2}}>${pu.toFixed(3)}/{ing.unit_use}</td>
                        <td style={g.td}>{ing.pack_size?<div><input style={{...g.inp,width:70,textAlign:"center"}} type="text" inputMode="decimal" placeholder="0" value={c.sealed} disabled={mode==="saved"} onChange={e=>upd(ing.id,"sealed",e.target.value)}/>{parseFloat(c.sealed)>0&&<div style={{fontSize:9,color:ACCENT,textAlign:"center"}}>={parseFloat(c.sealed)*ing.pack_size} {ing.unit_use}</div>}</div>:<span style={{fontSize:11,color:TEXT2}}>N/A</span>}</td>
                        <td style={g.td}><input style={{...g.inp,width:70,textAlign:"center"}} type="text" inputMode="decimal" placeholder="0" value={c.loose} disabled={mode==="saved"} onChange={e=>upd(ing.id,"loose",e.target.value)}/></td>
                        <td style={{...g.td,fontWeight:700,color:t2>0?ACCENT:TEXT2}}>{t2>0?`${t2} ${ing.unit_use}`:"—"}</td>
                        <td style={{...g.td,fontWeight:700,color:v>0?"#EF9F27":TEXT2}}>{v>0?`$${v.toFixed(2)}`:"—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </>}
      {mode==="view"&&!saved&&<div style={{...g.card,padding:40,textAlign:"center"}}>
        <i className="ti ti-clipboard-list" style={{fontSize:44,color:TEXT2,display:"block",marginBottom:12}}/>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>{t("noInventoryYet",lang)}</div>
        <button style={g.btnP} onClick={start}><i className="ti ti-clipboard-list"/>{t("startFirstCount",lang)}</button>
      </div>}
    </div>
  );
}

// ─── SHOPPING ────────────────────────────────────────────────────────────────
function Shopping() {
  const { ingredients, lang, mainSupplier, orderDays } = useApp();
  const auto = ingredients.filter(i=>parseFloat(i.stock)<(parseFloat(i.min_stock)||5)).map(i=>({id:i.id,name:i.name,category:i.category,unit:i.unit_purchase,price:i.price,qty:Math.max((parseFloat(i.min_stock)||5)-parseFloat(i.stock||0),1),auto:true,checked:false,note:"",supplier:i.supplier||"",group:i.supplier===mainSupplier?"provider":"storerun"}));
  const [items,setItems]=useState(auto);
  const [showAdd,setShowAdd]=useState(false);
  const [ni,setNI]=useState({name:"",category:"carnes",unit:"lb",qty:"",price:"",note:"",group:"storerun"});
  const [fCat,setFC]=useState("all");
  const [fGroup,setFGroup]=useState("all");
  const toggle=(id)=>setItems(p=>p.map(i=>i.id===id?{...i,checked:!i.checked}:i));
  const updQ=(id,v)=>setItems(p=>p.map(i=>i.id===id?{...i,qty:v}:i));
  const updN=(id,v)=>setItems(p=>p.map(i=>i.id===id?{...i,note:v}:i));
  const rem=(id)=>setItems(p=>p.filter(i=>i.id!==id));
  function add(){if(!ni.name.trim())return;setItems(p=>[...p,{id:Date.now(),name:ni.name,category:ni.category,unit:ni.unit,price:parseFloat(ni.price)||0,qty:parseFloat(ni.qty)||1,auto:false,checked:false,note:ni.note,supplier:"",group:ni.group}]);setNI({name:"",category:"carnes",unit:"lb",qty:"",price:"",note:"",group:"storerun"});setShowAdd(false);}
  const groupFiltered=fGroup==="all"?items:items.filter(i=>i.group===fGroup);
  const filtered=fCat==="all"?groupFiltered:groupFiltered.filter(i=>i.category===fCat);
  const grouped=CAT_ING.map(c=>({...c,items:filtered.filter(i=>i.category===c.id)})).filter(c=>c.items.length>0);
  const totalEst=items.reduce((s,i)=>s+(parseFloat(i.qty)||0)*i.price,0);
  const totalChk=items.filter(i=>i.checked).reduce((s,i)=>s+(parseFloat(i.qty)||0)*i.price,0);
  const providerItems=items.filter(i=>i.group==="provider");
  const storeRunItems=items.filter(i=>i.group==="storerun");

  // Order reminder logic
  const DAY_NAMES_ES=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const DAY_NAMES_EN=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  const todayIdx=new Date().getDay();
  const todayEs=DAY_NAMES_ES[todayIdx];
  const todayOrder=orderDays.find(d=>d.order===todayEs);
  const nextOrder=(()=>{
    if(orderDays.length===0) return null;
    for(let i=0;i<7;i++){
      const idx=(todayIdx+i)%7;
      const dayEs=DAY_NAMES_ES[idx];
      const match=orderDays.find(d=>d.order===dayEs);
      if(match) return {...match, daysAway:i};
    }
    return null;
  })();
  const dayLabel=(dayEs,l)=>{const idx=DAY_NAMES_ES.indexOf(dayEs);return l==="en"?DAY_NAMES_EN[idx]:dayEs;};

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:16}}>
      {todayOrder&&providerItems.length>0&&(
        <div style={{background:"rgba(200,49,43,0.06)",border:`1px solid ${ACCENT}`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
          <i className="ti ti-bell-ringing" style={{fontSize:18,color:ACCENT}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:ACCENT}}>{lang==="en"?`Today is order day for ${mainSupplier}!`:`¡Hoy es día de pedido para ${mainSupplier}!`}</div>
            <div style={{fontSize:11,color:TEXT2}}>{lang==="en"?`Delivery expected: ${dayLabel(todayOrder.deliver,lang)}. You have ${providerItems.length} item(s) pending.`:`Entrega esperada: ${dayLabel(todayOrder.deliver,lang)}. Tienes ${providerItems.length} ítem(s) pendiente(s).`}</div>
          </div>
        </div>
      )}
      {!todayOrder&&nextOrder&&providerItems.length>0&&(
        <div style={{background:SURF2,border:`1px solid ${BDR}`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
          <i className="ti ti-calendar-time" style={{fontSize:18,color:"#378ADD"}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600}}>{lang==="en"?`Next ${mainSupplier} order day: ${dayLabel(nextOrder.order,lang)}`:`Próximo día de pedido a ${mainSupplier}: ${dayLabel(nextOrder.order,lang)}`}</div>
            <div style={{fontSize:11,color:TEXT2}}>{lang==="en"?`${nextOrder.daysAway===0?"Today":nextOrder.daysAway+" day(s) away"} · Delivery: ${dayLabel(nextOrder.deliver,lang)}`:`${nextOrder.daysAway===0?"Hoy":"En "+nextOrder.daysAway+" día(s)"} · Entrega: ${dayLabel(nextOrder.deliver,lang)}`}</div>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10}}>
        {[{label:t("totalItems",lang),value:items.length,color:TEXT},{label:t("pending",lang),value:items.filter(i=>!i.checked).length,color:"#EF9F27"},{label:t("alreadyBought",lang),value:`$${totalChk.toFixed(2)}`,color:ACCENT},{label:t("totalEst",lang),value:`$${totalEst.toFixed(2)}`,color:"#378ADD"}].map((s,i)=>(
          <div key={i} style={{background:SURF,border:`1px solid ${BDR}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontSize:10,color:TEXT2,marginBottom:4}}>{s.label}</div>
            <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:4,background:SURF2,borderRadius:10,padding:4,width:"fit-content"}}>
        {[["all",lang==="en"?"All":"Todo"],["provider",`📦 ${mainSupplier}`],["storerun",lang==="en"?"🛒 Store Run":"🛒 Store Run"]].map(([id,label])=>(
          <button key={id} style={{background:fGroup===id?SURF:"transparent",color:fGroup===id?TEXT:TEXT2,border:"none",borderRadius:8,padding:"7px 14px",fontSize:11,fontWeight:fGroup===id?600:400,cursor:"pointer"}} onClick={()=>setFGroup(id)}>
            {label}{id==="provider"&&providerItems.length>0&&<span style={{marginLeft:5,fontSize:9,background:"rgba(200,49,43,0.15)",color:ACCENT,padding:"1px 5px",borderRadius:99}}>{providerItems.length}</span>}
            {id==="storerun"&&storeRunItems.length>0&&<span style={{marginLeft:5,fontSize:9,background:"rgba(55,138,221,0.2)",color:"#378ADD",padding:"1px 5px",borderRadius:99}}>{storeRunItems.length}</span>}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <select style={g.sel} value={fCat} onChange={e=>setFC(e.target.value)}><option value="all">{t("all",lang)}</option>{CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}</select>
        <button style={g.btnP} onClick={()=>setShowAdd(v=>!v)}><i className={`ti ${showAdd?"ti-x":"ti-plus"}`}/>{showAdd?t("cancel",lang):t("addItem",lang)}</button>
        <button style={g.btnS} onClick={()=>setItems(auto)}><i className="ti ti-refresh"/>{t("regenerate",lang)}</button>
        {items.some(i=>i.checked)&&<button style={g.btnD} onClick={()=>setItems(p=>p.filter(i=>!i.checked))}><i className="ti ti-trash"/>{t("clearBought",lang)}</button>}
      </div>
      {showAdd&&<div style={{...g.card,padding:14}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:10}}>
          <div style={{flex:2,minWidth:130,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("name",lang)}</label><input style={g.inp} value={ni.name} onChange={e=>setNI(n=>({...n,name:e.target.value}))}/></div>
          <div style={{flex:1,minWidth:110,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("category",lang)}</label><select style={{...g.inp,padding:"6px 8px"}} value={ni.category} onChange={e=>setNI(n=>({...n,category:e.target.value}))}>{CAT_ING.map(c=><option key={c.id} value={c.id}>{lang==="en"?c.label_en:c.label}</option>)}</select></div>
          <div style={{width:75,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("qty",lang)}</label><input style={g.inp} type="text" inputMode="decimal" value={ni.qty} onChange={e=>setNI(n=>({...n,qty:e.target.value}))}/></div>
          <div style={{width:100,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("unit",lang)}</label><select style={{...g.inp,padding:"6px 8px"}} value={ni.unit} onChange={e=>setNI(n=>({...n,unit:e.target.value}))}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select></div>
          <div style={{width:90,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("price",lang)}/u</label><input style={g.inp} type="text" inputMode="decimal" value={ni.price} onChange={e=>setNI(n=>({...n,price:e.target.value}))}/></div>
          <div style={{width:130,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{lang==="en"?"Where":"Dónde"}</label><select style={{...g.inp,padding:"6px 8px"}} value={ni.group} onChange={e=>setNI(n=>({...n,group:e.target.value}))}><option value="provider">📦 {mainSupplier}</option><option value="storerun">🛒 Store Run</option></select></div>
          <div style={{flex:2,minWidth:130,display:"flex",flexDirection:"column",gap:4}}><label style={g.lbl}>{t("note",lang)}</label><input style={g.inp} placeholder={t("optionalNote",lang)} value={ni.note} onChange={e=>setNI(n=>({...n,note:e.target.value}))}/></div>
        </div>
        <button style={g.btnP} onClick={add}><i className="ti ti-check"/>{t("addToList",lang)}</button>
      </div>}
      {grouped.map(cat=>(
        <div key={cat.id} style={g.card}>
          <div style={{...g.catH(cat.color),justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><i className="ti ti-tag" style={{fontSize:13}}/>{lang==="en"?cat.label_en:cat.label}<span style={{fontSize:10,fontWeight:400,opacity:0.7}}>({cat.items.length})</span></div>
            <span style={{fontSize:11,fontWeight:600}}>Est. ${cat.items.reduce((s,i)=>s+(parseFloat(i.qty)||0)*i.price,0).toFixed(2)}</span>
          </div>
          {cat.items.map(item=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:`1px solid ${BDR}`,opacity:item.checked?0.5:1}}>
              <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${item.checked?ACCENT:BDR}`,background:item.checked?"rgba(200,49,43,0.10)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}} onClick={()=>toggle(item.id)}>
                {item.checked&&<i className="ti ti-check" style={{fontSize:11,color:ACCENT}}/>}
              </div>
              <div style={{flex:1,cursor:"pointer"}} onClick={()=>toggle(item.id)}>
                <div style={{fontSize:13,fontWeight:500,textDecoration:item.checked?"line-through":"none"}}>{item.name}</div>
                <div style={{display:"flex",gap:6,marginTop:2}}>
                  {item.auto&&<span style={g.badge("warn")}>{t("lowStock",lang)}</span>}
                  {item.group==="provider"&&<span style={{fontSize:9,background:"rgba(200,49,43,0.10)",color:ACCENT,padding:"1px 6px",borderRadius:99,fontWeight:600}}>📦 {mainSupplier}</span>}
                  {item.group==="storerun"&&<span style={{fontSize:9,background:"rgba(55,138,221,0.15)",color:"#378ADD",padding:"1px 6px",borderRadius:99,fontWeight:600}}>🛒 Store Run</span>}
                  {item.note&&<span style={{fontSize:10,color:TEXT2,fontStyle:"italic"}}>"{item.note}"</span>}
                </div>
              </div>
              <input style={{...g.inp,width:60,textAlign:"center"}} type="text" inputMode="decimal" value={item.qty} onChange={e=>updQ(item.id,e.target.value)} onClick={e=>e.stopPropagation()}/>
              <span style={{fontSize:11,color:TEXT2}}>{item.unit}</span>
              <span style={{fontWeight:700,color:"#EF9F27",fontSize:12,minWidth:60,textAlign:"right"}}>${((parseFloat(item.qty)||0)*item.price).toFixed(2)}</span>
              <input style={{...g.inp,width:130,fontSize:11}} placeholder={lang==="en"?"Note...":"Nota..."} value={item.note} onChange={e=>updN(item.id,e.target.value)} onClick={e=>e.stopPropagation()}/>
              <button style={{...g.btnD,padding:"5px 9px"}} onClick={()=>rem(item.id)}><i className="ti ti-trash"/></button>
            </div>
          ))}
          <div style={{padding:"8px 14px",background:SURF2,display:"flex",justifyContent:"space-between",fontSize:11}}>
            <span style={{color:TEXT2}}>{cat.items.filter(i=>i.checked).length}/{cat.items.length} {t("bought",lang)}</span>
            <span style={{fontWeight:700,color:"#EF9F27"}}>{t("subtotal",lang)}: ${cat.items.reduce((s,i)=>s+(parseFloat(i.qty)||0)*i.price,0).toFixed(2)}</span>
          </div>
        </div>
      ))}
      {items.length>0&&<div style={{background:SURF,border:`1px solid ${BDR}`,borderRadius:12,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:24}}>
          <div><div style={{fontSize:10,color:TEXT2}}>{t("alreadyBought",lang)}</div><div style={{fontSize:18,fontWeight:700,color:ACCENT}}>${totalChk.toFixed(2)}</div></div>
          <div><div style={{fontSize:10,color:TEXT2}}>{t("pending",lang)}</div><div style={{fontSize:18,fontWeight:700,color:"#EF9F27"}}>${(totalEst-totalChk).toFixed(2)}</div></div>
        </div>
        <div style={{textAlign:"right"}}><div style={{fontSize:10,color:TEXT2}}>{t("estTotal",lang)}</div><div style={{fontSize:22,fontWeight:700}}>${totalEst.toFixed(2)}</div></div>
      </div>}
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
const WASTE_REASONS_ES = ["Vencimiento","Error de cocina","Sobras del día","Daño / Derrame","Otro"];
const WASTE_REASONS_EN = ["Expired","Cooking error","End of day leftovers","Damage / Spill","Other"];
function translateReason(reason, toLang) {
  if (toLang==="en") {
    const i = WASTE_REASONS_ES.indexOf(reason);
    return i>=0 ? WASTE_REASONS_EN[i] : reason;
  } else {
    const i = WASTE_REASONS_EN.indexOf(reason);
    return i>=0 ? WASTE_REASONS_ES[i] : reason;
  }
}

function WasteLog() {
  const { ingredients, recipes, lang } = useApp();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all"); // all, ingredient, recipe
  const [form, setForm] = useState({ type:"ingredient", item_id:"", item_name:"", quantity:"", unit:"", reason:"", notes:"" });
  const sf = (k,v) => setForm(x=>({...x,[k]:v}));
  const reasons = WASTE_REASONS_ES; // Always store in Spanish internally

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("waste_log").select("*").order("logged_at", { ascending: false });
      if (!error && data) setLogs(data);
      setLoading(false);
    }
    load();
  }, []);

  // Calculate cost based on type
  function calcCost(type, itemId, qty) {
    const q = parseFloat(qty) || 0;
    if (q <= 0) return 0;
    if (type === "ingredient") {
      const ing = ingredients.find(i => i.id === parseInt(itemId));
      if (!ing) return 0;
      const unitCost = ing.pack_size ? ing.price / ing.pack_size : ing.price;
      return q * unitCost;
    } else {
      const rec = recipes.find(r => r.id === parseInt(itemId));
      if (!rec) return 0;
      const c = calcRecipe(rec, ingredients);
      return q * c.cpp;
    }
  }

  async function save() {
    if (!form.item_id || !form.quantity || !form.reason) return;
    const cost = calcCost(form.type, form.item_id, form.quantity);
    const entry = {
      type: form.type,
      item_id: parseInt(form.item_id),
      item_name: form.item_name,
      quantity: parseFloat(form.quantity),
      unit: form.unit,
      reason: form.reason,
      cost,
      notes: form.notes,
    };
    const { data, error } = await supabase.from("waste_log").insert(entry).select().single();
    if (error) { alert("Error guardando: " + error.message); return; }

    // Also deduct from ingredient stock if type is ingredient
    if (form.type === "ingredient") {
      const ing = ingredients.find(i => i.id === parseInt(form.item_id));
      if (ing) {
        const newStock = Math.max(0, (parseFloat(ing.stock) || 0) - parseFloat(form.quantity));
        await supabase.from("ingredients").update({ stock: newStock }).eq("id", ing.id);
      }
    }

    setLogs(p => [data, ...p]);
    setForm({ type:"ingredient", item_id:"", item_name:"", quantity:"", unit:"", reason:"", notes:"" });
    setShowForm(false);
  }

  async function remove(id) {
    const { error } = await supabase.from("waste_log").delete().eq("id", id);
    if (error) { alert("Error eliminando: " + error.message); return; }
    setLogs(p => p.filter(l => l.id !== id));
  }

  const filtered = filter === "all" ? logs : logs.filter(l => l.type === filter);
  const totalCost = logs.reduce((s, l) => s + (parseFloat(l.cost) || 0), 0);
  const todayCost = logs.filter(l => new Date(l.logged_at).toDateString() === new Date().toDateString()).reduce((s, l) => s + (parseFloat(l.cost) || 0), 0);
  const weekCost = logs.filter(l => (new Date() - new Date(l.logged_at)) < 7 * 24 * 60 * 60 * 1000).reduce((s, l) => s + (parseFloat(l.cost) || 0), 0);

  // Group reasons for summary
  const byReason = {};
  logs.forEach(l => { byReason[l.reason] = (byReason[l.reason] || 0) + (parseFloat(l.cost) || 0); });
  const topReason = Object.entries(byReason).sort((a,b) => b[1]-a[1])[0];

  return (
    <div style={{padding:20, display:"flex", flexDirection:"column", gap:16}}>
      {/* Summary cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10}}>
        {[
          {label:lang==="en"?"Lost today":"Pérdida hoy",       value:`$${todayCost.toFixed(2)}`,  color:"#E24B4A"},
          {label:lang==="en"?"Lost this week":"Esta semana",    value:`$${weekCost.toFixed(2)}`,   color:"#EF9F27"},
          {label:lang==="en"?"Total logged":"Total registrado", value:`$${totalCost.toFixed(2)}`,  color:TEXT},
          {label:lang==="en"?"Top reason":"Mayor causa",        value:topReason?translateReason(topReason[0],lang):"—",  color:ACCENT, small:true},
        ].map((s,i) => (
          <div key={i} style={{background:SURF, border:`1px solid ${BDR}`, borderRadius:10, padding:"12px 14px"}}>
            <div style={{fontSize:10, color:TEXT2, marginBottom:4}}>{s.label}</div>
            <div style={{fontSize:s.small?12:20, fontWeight:700, color:s.color, lineHeight:1.3}}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{display:"flex", gap:10, flexWrap:"wrap", alignItems:"center"}}>
        <div style={{display:"flex", gap:4, background:SURF2, borderRadius:10, padding:4}}>
          {[["all", lang==="en"?"All":"Todo"], ["ingredient", lang==="en"?"Ingredients":"Ingredientes"], ["recipe", lang==="en"?"Dishes":"Platos"]].map(([id, label]) => (
            <button key={id} style={{background:filter===id?SURF:"transparent", color:filter===id?TEXT:TEXT2, border:"none", borderRadius:8, padding:"7px 14px", fontSize:11, fontWeight:filter===id?600:400, cursor:"pointer"}} onClick={()=>setFilter(id)}>{label}</button>
          ))}
        </div>
        <button style={{...g.btnP, marginLeft:"auto"}} onClick={()=>setShowForm(v=>!v)}>
          <i className={`ti ${showForm?"ti-x":"ti-plus"}`}/>{showForm?(lang==="en"?"Cancel":"Cancelar"):(lang==="en"?"Log waste":"Registrar desperdicio")}
        </button>
      </div>

      {/* Form */}
      {showForm && <div style={{...g.card, padding:16, display:"flex", flexDirection:"column", gap:12}}>
        <div style={{fontSize:13, fontWeight:700}}>{lang==="en"?"New waste entry":"Nuevo registro de desperdicio"}</div>

        {/* Type selector */}
        <div style={{display:"flex", gap:8}}>
          {[["ingredient", lang==="en"?"🥩 Ingredient":"🥩 Ingrediente"], ["recipe", lang==="en"?"🍽️ Dish":"🍽️ Plato"]].map(([id, label]) => (
            <button key={id} style={{flex:1, padding:"10px 14px", borderRadius:10, border:`2px solid ${form.type===id?ACCENT:BDR}`, background:form.type===id?"rgba(200,49,43,0.05)":SURF2, color:form.type===id?ACCENT:TEXT2, cursor:"pointer", fontSize:12, fontWeight:form.type===id?700:400}} onClick={()=>setForm(x=>({...x, type:id, item_id:"", item_name:"", unit:""}))}>
              {label}
            </button>
          ))}
        </div>

        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          {/* Item selector */}
          <div style={{flex:2, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{form.type==="ingredient"?(lang==="en"?"Ingredient":"Ingrediente"):(lang==="en"?"Dish":"Plato")}</label>
            <select style={{...g.sel, width:"100%"}} value={form.item_id} onChange={e=>{
              const id = e.target.value;
              const item = form.type==="ingredient" ? ingredients.find(i=>i.id===parseInt(id)) : recipes.find(r=>r.id===parseInt(id));
              sf("item_id", id);
              sf("item_name", item?.name || "");
              sf("unit", form.type==="ingredient" ? (item?.unit_use || "") : (lang==="en"?"portion":"porción"));
            }}>
              <option value="">{lang==="en"?"— Select —":"— Seleccionar —"}</option>
              {form.type==="ingredient"
                ? ingredients.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
                : recipes.map(r => <option key={r.id} value={r.id}>{lang==="en"&&r.name_en?r.name_en:r.name}</option>)
              }
            </select>
          </div>

          {/* Quantity */}
          <div style={{width:90, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Quantity":"Cantidad"}</label>
            <input style={g.inp} type="text" inputMode="decimal" value={form.quantity} onChange={e=>sf("quantity", e.target.value)}/>
          </div>

          {/* Unit */}
          <div style={{width:90, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Unit":"Unidad"}</label>
            {form.type==="ingredient"
              ? <select style={{...g.sel, width:"100%"}} value={form.unit} onChange={e=>sf("unit", e.target.value)}>{getUnits(lang).map(u=><option key={u}>{u}</option>)}</select>
              : <input style={g.inp} value={form.unit} readOnly/>
            }
          </div>

          {/* Reason */}
          <div style={{flex:2, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Reason":"Razón"}</label>
            <select style={{...g.sel, width:"100%"}} value={form.reason} onChange={e=>sf("reason", e.target.value)}>
              <option value="">{lang==="en"?"— Select reason —":"— Seleccionar razón —"}</option>
              {reasons.map((r,i) => <option key={r} value={r}>{lang==="en"?WASTE_REASONS_EN[i]:r}</option>)}
            </select>
          </div>
        </div>

        {/* Cost preview */}
        {form.item_id && form.quantity && <div style={{background:"rgba(226,75,74,0.06)", border:"1px solid rgba(226,75,74,0.2)", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#E24B4A"}}>
          <i className="ti ti-currency-dollar" style={{marginRight:6}}/>
          {lang==="en"?"Estimated loss:":"Pérdida estimada:"} <strong>${calcCost(form.type, form.item_id, form.quantity).toFixed(2)}</strong>
        </div>}

        {/* Notes */}
        <div style={{display:"flex", flexDirection:"column", gap:4}}>
          <label style={g.lbl}>{lang==="en"?"Notes (optional)":"Notas (opcional)"}</label>
          <input style={g.inp} placeholder={lang==="en"?"Add any details...":"Agrega detalles..."} value={form.notes} onChange={e=>sf("notes", e.target.value)}/>
        </div>

        <div style={{display:"flex", gap:10}}>
          <button style={{...g.btnP, flex:1, justifyContent:"center"}} onClick={save}><i className="ti ti-check"/>{lang==="en"?"Save entry":"Guardar registro"}</button>
          <button style={g.btnS} onClick={()=>setShowForm(false)}>{lang==="en"?"Cancel":"Cancelar"}</button>
        </div>
      </div>}

      {/* Log table */}
      {loading ? <div style={{textAlign:"center", padding:30, color:TEXT2}}><i className="ti ti-loader" style={{fontSize:24, display:"block", marginBottom:8}}/>{lang==="en"?"Loading...":"Cargando..."}</div>
      : filtered.length === 0 ? <div style={{...g.card, padding:40, textAlign:"center"}}>
          <i className="ti ti-trash-off" style={{fontSize:44, color:TEXT2, display:"block", marginBottom:12}}/>
          <div style={{fontSize:14, fontWeight:600, marginBottom:6}}>{lang==="en"?"No waste logged yet":"Sin registros de desperdicio todavía"}</div>
          <div style={{fontSize:11, color:TEXT2}}>{lang==="en"?"Use the button above to log your first entry":"Usa el botón de arriba para registrar el primero"}</div>
        </div>
      : <div style={g.card}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:12}}>
              <thead><tr>
                <th style={g.th}>{lang==="en"?"Date":"Fecha"}</th>
                <th style={g.th}>{lang==="en"?"Type":"Tipo"}</th>
                <th style={g.th}>{lang==="en"?"Item":"Ítem"}</th>
                <th style={g.th}>{lang==="en"?"Quantity":"Cantidad"}</th>
                <th style={g.th}>{lang==="en"?"Reason":"Razón"}</th>
                <th style={g.th}>{lang==="en"?"Cost lost":"Costo perdido"}</th>
                <th style={g.th}>{lang==="en"?"Notes":"Notas"}</th>
                <th style={g.th}>{lang==="en"?"Actions":"Acciones"}</th>
              </tr></thead>
              <tbody>
                {filtered.map(log => (
                  <tr key={log.id} onMouseEnter={e=>e.currentTarget.style.background=SURF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={g.td}>{new Date(log.logged_at).toLocaleDateString()}</td>
                    <td style={g.td}>
                      <span style={{fontSize:10, background:log.type==="ingredient"?"rgba(200,49,43,0.08)":"rgba(55,138,221,0.1)", color:log.type==="ingredient"?ACCENT:"#378ADD", padding:"2px 8px", borderRadius:99, fontWeight:600}}>
                        {log.type==="ingredient"?(lang==="en"?"Ingredient":"Ingrediente"):(lang==="en"?"Dish":"Plato")}
                      </span>
                    </td>
                    <td style={{...g.td, fontWeight:600}}>{log.item_name}</td>
                    <td style={g.td}>{log.quantity} {log.unit}</td>
                    <td style={g.td}><span style={g.badge("warn")}>{translateReason(log.reason, lang)}</span></td>
                    <td style={{...g.td, fontWeight:700, color:"#E24B4A"}}>${parseFloat(log.cost||0).toFixed(2)}</td>
                    <td style={{...g.td, color:TEXT2, fontStyle:"italic"}}>{log.notes||"—"}</td>
                    <td style={g.td}><button style={g.btnD} onClick={()=>remove(log.id)}><i className="ti ti-trash" style={{fontSize:12}}/>{lang==="en"?"Delete":"Eliminar"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{padding:"10px 16px", borderTop:`1px solid ${BDR}`, display:"flex", justifyContent:"flex-end", gap:20, fontSize:12}}>
            <span style={{color:TEXT2}}>{filtered.length} {lang==="en"?"entries":"registros"}</span>
            <span style={{fontWeight:700, color:"#E24B4A"}}>{lang==="en"?"Total lost:":"Total perdido:"} ${filtered.reduce((s,l)=>s+(parseFloat(l.cost)||0),0).toFixed(2)}</span>
          </div>
        </div>
      }
    </div>
  );
}

function ShoppingList() {
  const { ingredients, lang, setPendingShopping, shoppingSubmitted, setShoppingSubmitted, shoppingSubmittedBy, setShoppingSubmittedBy, currentUser } = useApp();
  const showToast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:"", quantity:"", unit:"lb", supplier:"", customName:"" });
  const sf = (k,v) => setForm(x=>({...x,[k]:v}));
  const suppliers = [...new Set(ingredients.map(i=>i.supplier).filter(Boolean))];

  useEffect(()=>{
    async function load() {
      const { data, error } = await supabase.from("shopping_list").select("*").order("supplier").order("created_at");
      if (!error && data) {
        setItems(data);
        setPendingShopping(data.filter(i=>!i.checked).length);
      }
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function addItem() {
    const finalName = form.name==="__custom" ? (form.customName||"").trim() : form.name.trim();
    if (!finalName) return;
    const { data, error } = await supabase.from("shopping_list").insert({
      name: finalName,
      quantity: form.quantity,
      unit: form.unit,
      supplier: form.supplier || (lang==="en"?"Other":"Otro"),
      checked: false,
    }).select().single();
    if (error) { alert("Error: "+error.message); return; }
    setItems(p=>{
      const newItems = [...p, data];
      setPendingShopping(newItems.filter(i=>!i.checked).length);
      return newItems;
    });
    setForm({ name:"", quantity:"", unit:"lb", supplier:form.supplier, customName:"" });
    setShowForm(false);
    showToast(lang==="en"?`✓ ${finalName} added to list`:`✓ ${finalName} agregado a la lista`);
  }

  async function toggle(id, checked) {
    await supabase.from("shopping_list").update({ checked: !checked }).eq("id", id);
    setItems(p=>{
      const newItems = p.map(i=>i.id===id?{...i,checked:!checked}:i);
      setPendingShopping(newItems.filter(i=>!i.checked).length);
      return newItems;
    });
  }

  async function remove(id) {
    await supabase.from("shopping_list").delete().eq("id", id);
    setItems(p=>{
      const newItems = p.filter(i=>i.id!==id);
      setPendingShopping(newItems.filter(i=>!i.checked).length);
      return newItems;
    });
  }

  async function clearChecked() {
    const checkedIds = items.filter(i=>i.checked).map(i=>i.id);
    if (checkedIds.length===0) return;
    await supabase.from("shopping_list").delete().in("id", checkedIds);
    setItems(p=>{
      const newItems = p.filter(i=>!i.checked);
      setPendingShopping(newItems.filter(i=>!i.checked).length);
      return newItems;
    });
  }

  async function submitList() {
    if (items.length===0) { showToast(lang==="en"?"Add items first":"Agrega ítems primero","error"); return; }
    const name = currentUser?.name || "Alguien";
    const { error } = await supabase.from("app_settings").update({
      shopping_submitted: true,
      shopping_submitted_by: name,
      shopping_submitted_at: new Date().toISOString(),
    }).eq("id", 1);
    if (error) { showToast("Error: "+error.message, "error"); return; }
    setShoppingSubmitted(true);
    setShoppingSubmittedBy(name);
    showToast(lang==="en"?"✓ List submitted! Everyone will be notified.":"✓ ¡Lista enviada! Todos verán el aviso.");
  }

  async function resetList() {
    const { error } = await supabase.from("app_settings").update({
      shopping_submitted: false,
      shopping_submitted_by: "",
      shopping_submitted_at: null,
    }).eq("id", 1);
    if (error) return;
    setShoppingSubmitted(false);
    setShoppingSubmittedBy("");
    showToast(lang==="en"?"List reset":"Lista reiniciada", "info");
  }

  // Group by supplier
  const grouped = {};
  items.forEach(item => {
    const sup = item.supplier || (lang==="en"?"Other":"Otro");
    if (!grouped[sup]) grouped[sup] = [];
    grouped[sup].push(item);
  });

  const checkedCount = items.filter(i=>i.checked).length;

  return (
    <div style={{padding:20, display:"flex", flexDirection:"column", gap:14}}>
      {/* Submitted banner */}
      {shoppingSubmitted&&<div style={{background:"rgba(200,49,43,0.06)",border:`1px solid ${ACCENT}`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <i className="ti ti-circle-check" style={{fontSize:20,color:ACCENT,flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:700,color:ACCENT}}>{lang==="en"?"List submitted!":"¡Lista enviada!"}</div>
          <div style={{fontSize:11,color:TEXT2}}>{lang==="en"?`Submitted by ${shoppingSubmittedBy}`:`Enviada por ${shoppingSubmittedBy}`}</div>
        </div>
        <button style={{...g.btnS,fontSize:11,padding:"6px 12px"}} onClick={resetList}>{lang==="en"?"Reset":"Reiniciar"}</button>
      </div>}

      {/* Header controls */}
      <div style={{display:"flex", gap:10, flexWrap:"wrap", alignItems:"center"}}>
        <button style={g.btnP} onClick={()=>setShowForm(v=>!v)}>
          <i className={`ti ${showForm?"ti-x":"ti-plus"}`}/>
          {showForm?(lang==="en"?"Cancel":"Cancelar"):(lang==="en"?"Add item":"Agregar ítem")}
        </button>
        {checkedCount>0&&<button style={g.btnD} onClick={clearChecked}>
          <i className="ti ti-trash"/>{lang==="en"?`Clear ${checkedCount} bought`:`Limpiar ${checkedCount} comprados`}
        </button>}
        {items.length>0&&!shoppingSubmitted&&<button style={{...g.btnP,background:"#378ADD",marginLeft:"auto"}} onClick={submitList}>
          <i className="ti ti-send"/>{lang==="en"?"Submit list":"Enviar lista"}
        </button>}
        {!items.length&&<span style={{marginLeft:"auto", fontSize:11, color:TEXT2}}>
          {items.length} {lang==="en"?"items":"ítems"} · {checkedCount} {lang==="en"?"bought":"comprados"}
        </span>}
      </div>

      {/* Add form */}
      {showForm&&<div style={{...g.card, padding:16, display:"flex", flexDirection:"column", gap:12}}>
        <div style={{fontSize:13, fontWeight:700}}>{lang==="en"?"New item":"Nuevo ítem"}</div>
        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          <div style={{flex:2, minWidth:150, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Ingredient":"Ingrediente"}</label>
            <select style={{...g.sel, width:"100%"}} value={form.name} onChange={e=>{
              const selected = ingredients.find(i=>i.name===e.target.value);
              sf("name", e.target.value);
              if (selected) {
                sf("unit", selected.unit_purchase||selected.unit_use||"lb");
                sf("supplier", selected.supplier||"");
              }
            }}>
              <option value="">{lang==="en"?"— Select ingredient —":"— Seleccionar ingrediente —"}</option>
              {[...ingredients].sort((a,b)=>a.name.localeCompare(b.name)).map(i=>(
                <option key={i.id} value={i.name}>{i.name}</option>
              ))}
              <option value="__custom">✏️ {lang==="en"?"Write manually...":"Escribir manualmente..."}</option>
            </select>
          </div>
          {form.name==="__custom"&&<div style={{flex:2, minWidth:150, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Item name":"Nombre del ítem"}</label>
            <input style={g.inp} placeholder={lang==="en"?"e.g. Paper bags":"ej. Bolsas de papel"} value={form.customName||""} onChange={e=>setForm(x=>({...x,customName:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addItem()}/>
          </div>}
          <div style={{width:80, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Qty":"Cantidad"}</label>
            <input style={g.inp} placeholder="0" value={form.quantity} onChange={e=>sf("quantity",e.target.value)}/>
          </div>
          <div style={{width:90, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Unit":"Unidad"}</label>
            <select style={{...g.sel, width:"100%"}} value={form.unit} onChange={e=>sf("unit",e.target.value)}>
              {getUnits(lang).map(u=><option key={u}>{u}</option>)}
            </select>
          </div>
          <div style={{flex:1, minWidth:130, display:"flex", flexDirection:"column", gap:4}}>
            <label style={g.lbl}>{lang==="en"?"Supplier":"Proveedor"}</label>
            <select style={{...g.sel, width:"100%"}} value={form.supplier} onChange={e=>sf("supplier",e.target.value)}>
              <option value="">{lang==="en"?"— Select —":"— Seleccionar —"}</option>
              {suppliers.map(s=><option key={s} value={s}>{s}</option>)}
              <option value={lang==="en"?"Other":"Otro"}>{lang==="en"?"Other":"Otro"}</option>
            </select>
          </div>
        </div>
        <button style={{...g.btnP, alignSelf:"flex-start"}} onClick={addItem}>
          <i className="ti ti-check"/>{lang==="en"?"Add to list":"Agregar a la lista"}
        </button>
      </div>}

      {/* Loading */}
      {loading&&<div style={{textAlign:"center", padding:30, color:TEXT2}}>
        <i className="ti ti-loader" style={{fontSize:24, display:"block", marginBottom:8}}/>
        {lang==="en"?"Loading...":"Cargando..."}
      </div>}

      {/* Empty state */}
      {!loading&&items.length===0&&<div style={{...g.card, padding:40, textAlign:"center"}}>
        <i className="ti ti-shopping-cart" style={{fontSize:44, color:TEXT2, display:"block", marginBottom:12}}/>
        <div style={{fontSize:14, fontWeight:600, marginBottom:6}}>{lang==="en"?"Your shopping list is empty":"Tu lista de compras está vacía"}</div>
        <div style={{fontSize:11, color:TEXT2, marginBottom:16}}>{lang==="en"?"Add items using the button above":"Agrega ítems usando el botón de arriba"}</div>
        <button style={g.btnP} onClick={()=>setShowForm(true)}><i className="ti ti-plus"/>{lang==="en"?"Add first item":"Agregar primer ítem"}</button>
      </div>}

      {/* Grouped by supplier */}
      {!loading&&Object.entries(grouped).map(([supplier, supItems])=>(
        <div key={supplier} style={g.card}>
          <div style={{padding:"10px 14px", borderBottom:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:SURF2}}>
            <span style={{fontSize:12, fontWeight:700, color:ACCENT}}>
              <i className="ti ti-building-store" style={{marginRight:6}}/>{supplier}
            </span>
            <span style={{fontSize:10, color:TEXT2}}>{supItems.filter(i=>!i.checked).length} {lang==="en"?"pending":"pendientes"}</span>
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
            {supItems.map(item=>(
              <div key={item.id} style={{display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderBottom:`1px solid ${BDR}`, opacity:item.checked?0.5:1, transition:"opacity 0.2s"}}>
                {/* Checkbox */}
                <div style={{width:20, height:20, borderRadius:6, border:`2px solid ${item.checked?ACCENT:BDR}`, background:item.checked?"rgba(200,49,43,0.10)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0}} onClick={()=>toggle(item.id, item.checked)}>
                  {item.checked&&<i className="ti ti-check" style={{fontSize:11, color:ACCENT}}/>}
                </div>
                {/* Item info */}
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:500, textDecoration:item.checked?"line-through":"none", color:item.checked?TEXT2:TEXT}}>{item.name}</div>
                  {(item.quantity||item.unit)&&<div style={{fontSize:11, color:TEXT2}}>{item.quantity} {item.unit}</div>}
                </div>
                {/* Delete */}
                <button style={{...g.btnD, padding:"4px 8px"}} onClick={()=>remove(item.id)}>
                  <i className="ti ti-trash" style={{fontSize:12}}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Settings() {
  const { currentUser, setUser, users, setUsers, lang, setLang, mainSupplier, setMainSupplier, orderDays, setOrderDays, ingredients } = useApp();
  const [tab,setTab]=useState("account");
  const [editU,setEd]=useState(null);
  const [addNew,setAN]=useState(false);
  async function saveUser(u){
    const isExisting = users.some(x=>x.id===u.id);
    if (isExisting) {
      const { id, ...updateFields } = u;
      const { error } = await supabase.from("app_users").update(updateFields).eq("id", id);
      if (error) { alert("Error guardando usuario: "+error.message); return; }
      setUsers(p=>p.map(x=>x.id===u.id?u:x));
    } else {
      const { id, ...insertFields } = u;
      const { data, error } = await supabase.from("app_users").insert(insertFields).select().single();
      if (error) { alert("Error creando usuario: "+error.message); return; }
      setUsers(p=>[...p,data]);
    }
    setEd(null); setAN(false);
  }
  async function removeUser(id){
    const { error } = await supabase.from("app_users").delete().eq("id", id);
    if (error) { alert("Error eliminando usuario: "+error.message); return; }
    setUsers(p=>p.filter(x=>x.id!==id));
  }
  const tabs=[
    {id:"account",  label:t("myAccount",lang), icon:"ti-user"},
    {id:"orders",   label:lang==="en"?"Order schedule":"Días de pedido", icon:"ti-calendar-event"},
    {id:"language", label:lang==="es"?"Idioma":"Language",      icon:"ti-language"},
    ...(currentUser.role==="admin"?[{id:"users",label:t("users",lang),icon:"ti-users"}]:[]),
  ];
  const DAYS_ES=["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
  const DAYS_EN=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  const dayOptLabel=(d)=>{const i=DAYS_ES.indexOf(d);return lang==="en"?DAYS_EN[i]:d;};
  const suppliers=[...new Set(ingredients.map(i=>i.supplier).filter(Boolean))];
  async function updateMainSupplier(val){
    setMainSupplier(val);
    const { error } = await supabase.from("app_settings").update({ main_supplier: val }).eq("id", 1);
    if (error) console.error("Error guardando proveedor principal:", error.message);
  }
  async function saveOrderDays(newDays){
    setOrderDays(newDays);
    const { error } = await supabase.from("app_settings").update({ order_days: newDays }).eq("id", 1);
    if (error) console.error("Error guardando días de pedido:", error.message);
  }
  function addOrderDay(){saveOrderDays([...orderDays,{order:"lunes",deliver:"martes"}]);}
  function updOrderDay(idx,k,v){saveOrderDays(orderDays.map((d,i)=>i===idx?{...d,[k]:v}:d));}
  function rmOrderDay(idx){saveOrderDays(orderDays.filter((_,i)=>i!==idx));}
  const MODS=[{id:"dashboard",icon:"ti-layout-dashboard",label:"Dashboard"},{id:"ingredients",icon:"ti-basket",label:t("totalIngredients",lang)},{id:"recipes",icon:"ti-book",label:t("tabIngredients",lang)==="Ingredients"?"Recipes":"Recetas"},{id:"invoices",icon:"ti-receipt",label:lang==="en"?"Invoices":"Facturas"},{id:"inventory",icon:"ti-box",label:lang==="en"?"Inventory":"Inventario"},{id:"wastelog",icon:"ti-trash",label:"Waste Log"}];
  return (
    <div style={{padding:24,display:"flex",flexDirection:"column",gap:16,maxWidth:680}}>
      <div style={{display:"flex",gap:4,background:SURF2,borderRadius:10,padding:4,width:"fit-content"}}>
        {tabs.map(tb=>(
          <button key={tb.id} style={{background:tab===tb.id?SURF:"transparent",color:tab===tb.id?TEXT:TEXT2,border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:tab===tb.id?600:400,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}} onClick={()=>setTab(tb.id)}>
            <i className={`ti ${tb.icon}`}/>{tb.label}
          </button>
        ))}
      </div>

      {tab==="account"&&<div style={{...g.card,padding:20,display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={g.avt(ROLE_COLORS[currentUser.role]||TEXT2)}>{currentUser.avatar}</div>
          <div>
            <div style={{fontSize:15,fontWeight:700}}>{currentUser.name}</div>
            <div style={{fontSize:12,color:TEXT2}}>{currentUser.email}</div>
            <span style={{fontSize:10,background:`${ROLE_COLORS[currentUser.role]}22`,color:ROLE_COLORS[currentUser.role],padding:"2px 8px",borderRadius:99,fontWeight:700,display:"inline-block",marginTop:4}}>{currentUser.role}</span>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${BDR}`,paddingTop:14}}>
          <div style={{fontSize:11,color:TEXT2,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:10}}>{lang==="en"?"Permissions":"Permisos"}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
            {MODS.map(mod=>{
              const perm=currentUser.role==="admin"?"edit":currentUser.permissions[mod.id];
              return (
                <div key={mod.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:SURF2,borderRadius:8,fontSize:11}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><i className={`ti ${mod.icon}`} style={{color:TEXT2}}/>{mod.label}</div>
                  <span style={{fontSize:10,color:perm==="edit"?ACCENT:perm==="view"?"#378ADD":TEXT2,fontWeight:600}}>{perm==="edit"?t("viewEdit",lang):perm==="view"?t("viewOnly",lang):t("noAccess",lang)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <button style={{...g.btnD,width:"fit-content"}} onClick={()=>setUser(null)}><i className="ti ti-logout"/>{t("signOut",lang)}</button>
      </div>}

      {tab==="orders"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{...g.card,padding:20,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:13,fontWeight:600}}>{lang==="en"?"Main supplier":"Proveedor principal"}</div>
          <div style={{fontSize:11,color:TEXT2,marginTop:-6}}>{lang==="en"?"Ingredients from this supplier go to 'Provider Order' in your shopping list. Everything else goes to 'Store Run'.":"Los ingredientes de este proveedor van a 'Pedido Proveedor' en tu lista de compras. Todo lo demás va a 'Store Run'."}</div>
          <select style={{...g.sel,width:"100%"}} value={mainSupplier} onChange={e=>updateMainSupplier(e.target.value)}>
            {suppliers.length===0&&<option value={mainSupplier}>{mainSupplier}</option>}
            {suppliers.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{...g.card,padding:20,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{lang==="en"?"Order & delivery days":"Días de pedido y entrega"}</div>
              <div style={{fontSize:11,color:TEXT2}}>{lang==="en"?`When do you place orders with ${mainSupplier}?`:`¿Cuándo le pones pedidos a ${mainSupplier}?`}</div>
            </div>
            <button style={g.btnP} onClick={addOrderDay}><i className="ti ti-plus"/>{t("add",lang)}</button>
          </div>
          {orderDays.length===0&&<div style={{fontSize:11,color:TEXT2,fontStyle:"italic"}}>{lang==="en"?"No order days configured yet.":"Sin días de pedido configurados."}</div>}
          {orderDays.map((d,idx)=>(
            <div key={idx} style={{display:"flex",gap:10,alignItems:"flex-end",background:SURF2,borderRadius:8,padding:"10px 12px"}}>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
                <label style={g.lbl}>{lang==="en"?"I order on":"Pido el"}</label>
                <select style={{...g.sel,width:"100%"}} value={d.order} onChange={e=>updOrderDay(idx,"order",e.target.value)}>{DAYS_ES.map(day=><option key={day} value={day}>{dayOptLabel(day)}</option>)}</select>
              </div>
              <i className="ti ti-arrow-right" style={{color:TEXT2,marginBottom:10}}/>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
                <label style={g.lbl}>{lang==="en"?"Delivered on":"Despachan el"}</label>
                <select style={{...g.sel,width:"100%"}} value={d.deliver} onChange={e=>updOrderDay(idx,"deliver",e.target.value)}>{DAYS_ES.map(day=><option key={day} value={day}>{dayOptLabel(day)}</option>)}</select>
              </div>
              <button style={g.btnD} onClick={()=>rmOrderDay(idx)}><i className="ti ti-trash"/></button>
            </div>
          ))}
        </div>
      </div>}

      {tab==="language"&&<div style={{...g.card,padding:20,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{fontSize:13,fontWeight:600}}>{lang==="es"?"Idioma de la app":"App language"}</div>
        <div style={{display:"flex",gap:10}}>
          {["es","en"].map(l=>(
            <button key={l} style={{flex:1,padding:14,borderRadius:10,border:`2px solid ${lang===l?ACCENT:BDR}`,background:lang===l?"rgba(200,49,43,0.05)":SURF2,color:lang===l?ACCENT:TEXT2,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,fontWeight:lang===l?700:400,fontSize:12}} onClick={async()=>{setLang(l);const{error}=await supabase.from("app_settings").update({lang:l}).eq("id",1);if(error)console.error("Error guardando idioma:",error.message);}}>
              <i className="ti ti-language" style={{fontSize:24,color:lang===l?ACCENT:TEXT2}}/>
              {l==="es"?"Español":"English"}
              {lang===l&&<span style={{fontSize:10}}>✓ {lang==="en"?"Active":"Activo"}</span>}
            </button>
          ))}
        </div>
      </div>}

      {tab==="users"&&currentUser.role==="admin"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:13,fontWeight:600}}>{t("users",lang)} ({users.length})</span>
          <button style={g.btnP} onClick={()=>setAN(true)}><i className="ti ti-plus"/>{t("add",lang)}</button>
        </div>
        {users.map(u=>(
          <div key={u.id} style={{...g.card,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={g.avt(ROLE_COLORS[u.role]||TEXT2)}>{u.avatar}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{u.name}</div><div style={{fontSize:11,color:TEXT2}}>{u.email}</div></div>
            <span style={{fontSize:10,background:`${ROLE_COLORS[u.role]}22`,color:ROLE_COLORS[u.role],padding:"2px 8px",borderRadius:99,fontWeight:700}}>{u.role}</span>
            <div style={{display:"flex",gap:6}}>
              <button style={g.btnI} onClick={()=>setEd(u)}><i className="ti ti-pencil" style={{fontSize:12}}/>{t("edit",lang)}</button>
              {u.id!==currentUser.id&&<button style={g.btnD} onClick={()=>removeUser(u.id)}><i className="ti ti-trash" style={{fontSize:12}}/>{t("delete",lang)}</button>}
            </div>
          </div>
        ))}
      </div>}
      {(editU||addNew)&&<UserModal user={editU} isNew={addNew} onSave={saveUser} onClose={()=>{setEd(null);setAN(false);}} MODS={MODS} lang={lang}/>}
    </div>
  );
}

function UserModal({user:init,isNew,onSave,onClose,MODS,lang}) {
  const blank={id:Date.now(),name:"",email:"",password:"",role:"employee",avatar:"",permissions:{dashboard:"view",ingredients:"view",recipes:"view",invoices:null,inventory:"edit",settings:null}};
  const [f,setF]=useState(init||blank);
  const [np,setNP]=useState("");
  const sf=(k,v)=>setF(x=>({...x,[k]:v}));
  const sp=(mod,val)=>setF(x=>({...x,permissions:{...x.permissions,[mod]:val}}));
  function save(){const u={...f};if(np.trim())u.password=np;if(!u.avatar)u.avatar=u.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);onSave(u);}
  return (
    <div style={g.modal}>
      <div style={g.mbox} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:14,fontWeight:700}}>{isNew?t("newUser",lang):t("editUser",lang)}</span><button style={g.btnS} onClick={onClose}><i className="ti ti-x"/></button></div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("name",lang)}</label><input style={g.inp} value={f.name} onChange={e=>sf("name",e.target.value)}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("email",lang)}</label><input style={g.inp} type="email" value={f.email} onChange={e=>sf("email",e.target.value)}/></div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{isNew?t("password",lang):t("newPassword",lang)}</label><input style={g.inp} type="password" placeholder="••••••••" value={isNew?f.password:np} onChange={e=>isNew?sf("password",e.target.value):setNP(e.target.value)}/></div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}><label style={g.lbl}>{t("role",lang)}</label><select style={{...g.sel,width:"100%"}} value={f.role} onChange={e=>sf("role",e.target.value)}><option value="admin">Admin</option><option value="chef">Chef</option><option value="employee">{lang==="en"?"Employee":"Empleado"}</option></select></div>
        </div>
        {f.role!=="admin"&&<div style={{background:SURF2,borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:12,fontWeight:600}}><i className="ti ti-lock" style={{marginRight:6,color:ACCENT}}/>{t("modulePerms",lang)}</div>
          {MODS.map(mod=>(
            <div key={mod.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}><i className={`ti ${mod.icon}`} style={{color:TEXT2,fontSize:13}}/>{mod.label}</div>
              <select style={{background:f.permissions[mod.id]==="edit"?"rgba(200,49,43,0.08)":f.permissions[mod.id]==="view"?"rgba(55,138,221,0.1)":SURF2,color:f.permissions[mod.id]==="edit"?ACCENT:f.permissions[mod.id]==="view"?"#378ADD":TEXT2,border:`1px solid ${f.permissions[mod.id]?"rgba(200,49,43,0.20)":BDR}`,borderRadius:6,padding:"4px 8px",fontSize:11,cursor:"pointer",outline:"none",fontWeight:600}} value={f.permissions[mod.id]||"none"} onChange={e=>sp(mod.id,e.target.value==="none"?null:e.target.value)}>
                <option value="none">{t("noAccess",lang)}</option><option value="view">{t("viewOnly",lang)}</option><option value="edit">{t("viewEdit",lang)}</option>
              </select>
            </div>
          ))}
        </div>}
        {f.role==="admin"&&<div style={{background:"rgba(200,49,43,0.04)",border:"1px solid rgba(200,49,43,0.15)",borderRadius:8,padding:"10px 14px",fontSize:12,color:ACCENT}}><i className="ti ti-shield-check" style={{marginRight:6}}/>{t("adminFullAccess",lang)}</div>}
        <div style={{display:"flex",gap:10}}>
          <button style={{...g.btnP,flex:1,justifyContent:"center"}} onClick={save}><i className="ti ti-check"/>{t("save",lang)}</button>
          <button style={g.btnS} onClick={onClose}>{t("cancel",lang)}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
const MOBILE_NAV_ITEMS = [
  { id:"dashboard",   icon:"ti-layout-dashboard", es:"Inicio",     en:"Home" },
  { id:"recipes",     icon:"ti-book",             es:"Recetas",    en:"Recipes" },
  { id:"inventory",   icon:"ti-box",              es:"Inventario", en:"Inventory" },
  { id:"invoices",    icon:"ti-receipt",          es:"Facturas",   en:"Invoices" },
  { id:"__more__",    icon:"ti-dots",             es:"Más",        en:"More" },
];
const MORE_ITEMS = [
  { id:"ingredients", icon:"ti-basket",       es:"Ingredientes", en:"Ingredients" },
  { id:"wastelog",    icon:"ti-trash",        es:"Desperdicio",  en:"Waste Log" },
  { id:"shopping",    icon:"ti-shopping-cart",es:"Compras",      en:"Shopping" },
  { id:"settings",    icon:"ti-settings",     es:"Configuración",en:"Settings" },
];

function MobileBottomNav({ page, setPage, lang, pendingShopping }) {
  const [showMore, setShowMore] = useState(false);
  const isMorePage = MORE_ITEMS.some(i=>i.id===page);

  function navTo(id) {
    setPage(id);
    setShowMore(false);
  }

  return (
    <>
      {/* More drawer */}
      {showMore && (
        <div style={{ position:"fixed", inset:0, zIndex:99 }} onClick={()=>setShowMore(false)}>
          <div style={{ position:"fixed", bottom:56, left:0, right:0, background:SURF, borderTop:`1px solid ${BDR}`, padding:"8px 0", boxShadow:"0 -4px 20px rgba(0,0,0,0.1)", zIndex:100 }}
            onClick={e=>e.stopPropagation()}>
            {MORE_ITEMS.map(item=>{
              const active = page===item.id;
              return (
                <div key={item.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 20px", cursor:"pointer", background:active?"#F8E1DF":"transparent" }}
                  onClick={()=>navTo(item.id)}>
                  <i className={`ti ${item.icon}`} style={{ fontSize:18, color:active?ACCENT:TEXT2 }}/>
                  <span style={{ fontSize:14, color:active?ACCENT:TEXT, fontWeight:active?600:400 }}>{lang==="es"?item.es:item.en}</span>
                  {item.id==="shopping"&&pendingShopping>0&&<span style={{marginLeft:"auto",background:ACCENT,color:"#fff",fontSize:10,fontWeight:700,borderRadius:99,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 5px"}}>{pendingShopping}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Bottom bar */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:SURF, borderTop:`1px solid ${BDR}`, display:"flex", zIndex:100, paddingBottom:"env(safe-area-inset-bottom)", height:56 }}>
        {MOBILE_NAV_ITEMS.map(item=>{
          const isMore = item.id==="__more__";
          const active = isMore ? (showMore||isMorePage) : page===item.id;
          return (
            <div key={item.id} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"6px 2px", cursor:"pointer", background:active?"#F8E1DF":"transparent", position:"relative" }}
              onClick={()=>{ if(isMore){ setShowMore(v=>!v); } else { setPage(item.id); setShowMore(false); } }}>
              <i className={`ti ${item.icon}`} style={{ fontSize:19, color:active?ACCENT:TEXT2, marginBottom:2 }}/>
              {item.id==="shopping"&&pendingShopping>0&&<span style={{position:"absolute",top:4,right:"calc(50% - 14px)",background:ACCENT,color:"#fff",fontSize:9,fontWeight:700,borderRadius:99,minWidth:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{pendingShopping}</span>}
              <span style={{ fontSize:9, fontWeight:active?600:400, color:active?ACCENT:TEXT2, textAlign:"center", lineHeight:1.2 }}>{lang==="es"?item.es:item.en}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useIsMobile();
  // Session lives ONLY in memory (window.__chefcostSession).
  // localStorage stores the user record but NOT a valid session flag.
  // When the PWA window closes and reopens, window.__chefcostSession is gone → login required.
  const [currentUser, setUserState] = useState(()=>{
    try {
      // Only restore session if the in-memory flag is set (same JS process / tab)
      if (!window.__chefcostSession) return null;
      const s = localStorage.getItem("chefcost_user");
      return s ? JSON.parse(s) : null;
    } catch(e){ return null; }
  });
  function setUser(u) {
    setUserState(u);
    try {
      if (u) {
        window.__chefcostSession = true;
        localStorage.setItem("chefcost_user", JSON.stringify(u));
      } else {
        window.__chefcostSession = false;
        localStorage.removeItem("chefcost_user");
      }
    } catch(e) {}
  }
  const [users,       setUsers]       = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes,     setRecipes]     = useState([]);
  const [invoices,    setInvoices]    = useState([]);
  const [lang,        setLang]        = useState("es");
  const [mainSupplier, setMainSupplier] = useState("Restaurant Depot");
  const [orderDays,   setOrderDays]   = useState([]);
  const [pendingShopping, setPendingShopping] = useState(0);
  const [shoppingSubmitted, setShoppingSubmitted] = useState(false);
  const [shoppingSubmittedBy, setShoppingSubmittedBy] = useState("");
  const [page,        setPage]        = useState("dashboard");
  const [dbLoading,   setDbLoading]   = useState(true);
  const [dbError,     setDbError]     = useState(null);

  // Load all data from Supabase on first mount
  useEffect(() => {
    async function loadAll() {
      try {
        const [ingRes, recRes, invRes, usrRes, setRes] = await Promise.all([
          supabase.from("ingredients").select("*").order("id"),
          supabase.from("recipes").select("*").order("id"),
          supabase.from("invoices").select("*").order("date", { ascending: false }),
          supabase.from("app_users").select("*").order("id"),
          supabase.from("app_settings").select("*").eq("id", 1).single(),
        ]);
        const shopRes = await supabase.from("shopping_list").select("id").eq("checked", false);
        if (ingRes.error) throw ingRes.error;
        if (recRes.error) throw recRes.error;
        if (invRes.error) throw invRes.error;
        if (usrRes.error) throw usrRes.error;

        setIngredients(ingRes.data || []);
        setRecipes((recRes.data || []).map(r => ({
          ...r,
          ingredients: r.ingredients || [],
          steps: r.steps || [],
          allergens: r.allergens || [],
        })));
        setInvoices(invRes.data || []);
        setUsers(usrRes.data || []);
        if (setRes.data) {
          setLang(setRes.data.lang || "es");
          setMainSupplier(setRes.data.main_supplier || "Restaurant Depot");
          setOrderDays(setRes.data.order_days || []);
        }
        if (!shopRes.error && shopRes.data) {
          setPendingShopping(shopRes.data.length);
        }
        // Load shopping submitted state
        const subRes = await supabase.from("app_settings").select("shopping_submitted,shopping_submitted_by").eq("id",1).single();
        if (!subRes.error && subRes.data) {
          setShoppingSubmitted(subRes.data.shopping_submitted||false);
          setShoppingSubmittedBy(subRes.data.shopping_submitted_by||"");
        }
      } catch (e) {
        setDbError(e.message || String(e));
      } finally {
        setDbLoading(false);
      }
    }
    loadAll();
  }, []);

  const canAccess = (id) => !currentUser ? false : currentUser.role==="admin" ? true : !!currentUser.permissions[id];
  const canEdit   = (id) => !currentUser ? false : currentUser.role==="admin" ? true : currentUser.permissions[id]==="edit";

  const ctx = { currentUser, setUser, users, setUsers, ingredients, setIngredients, recipes, setRecipes, invoices, setInvoices, lang, setLang, mainSupplier, setMainSupplier, orderDays, setOrderDays, pendingShopping, setPendingShopping, setPage, shoppingSubmitted, setShoppingSubmitted, shoppingSubmittedBy, setShoppingSubmittedBy };

  const PAGES = { dashboard:<Dashboard/>, ingredients:<Ingredients/>, recipes:<Recipes/>, invoices:<Invoices/>, inventory:<Inventory/>, wastelog:<WasteLog/>, shopping:<ShoppingList/>, settings:<Settings/> };
  const visibleNav = [...NAV.filter(n=>canAccess(n.id)), { id:"settings", icon:"ti-settings", es:"Configuración", en:"Settings" }];

  if (dbLoading) {
    return (
      <div style={{ minHeight:"100vh", background:BG, color:TEXT, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI Variable','Segoe UI',system-ui,sans-serif" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:32, height:32, border:`3px solid ${BDR}`, borderTop:`3px solid ${ACCENT}`, borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 14px" }}/>
          <div style={{ fontSize:13, color:TEXT2 }}>Conectando con la base de datos...</div>
        </div>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (dbError) {
    return (
      <div style={{ minHeight:"100vh", background:BG, color:TEXT, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI Variable','Segoe UI',system-ui,sans-serif", padding:20 }}>
        <div style={{ textAlign:"center", maxWidth:400 }}>
          <i className="ti ti-alert-triangle" style={{ fontSize:36, color:"#E24B4A", display:"block", marginBottom:12 }}/>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:6 }}>Error de conexión con la base de datos</div>
          <div style={{ fontSize:12, color:TEXT2 }}>{dbError}</div>
        </div>
      </div>
    );
  }

  return (
    <AppCtx.Provider value={ctx}>
      <ToastProvider>
      <div style={{ minHeight:"100vh", background:BG, color:TEXT, fontFamily:"'Segoe UI Variable','Segoe UI',system-ui,sans-serif" }}>
        <style>{`
          @keyframes spin { to { transform:rotate(360deg); } }
          * { box-sizing:border-box; margin:0; padding:0; }
          body { background:${BG}; font-family:'Segoe UI Variable','Segoe UI',system-ui,sans-serif; }
          input:focus, select:focus, textarea:focus { outline:none; border-color:#8A8A8A !important; border-bottom-color:${ACCENT} !important; }
          button:hover { opacity:0.88; }
          ::-webkit-scrollbar { width:5px; height:5px; }
          ::-webkit-scrollbar-track { background:transparent; }
          ::-webkit-scrollbar-thumb { background:${BDR}; border-radius:99px; }
          ::-webkit-scrollbar-thumb:hover { background:#C0C0C0; }
          .mobile-card { background:${SURF}; border:1px solid ${BDR}; border-radius:8px; padding:12px 14px; margin-bottom:8px; }
          .mobile-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
          .mobile-label { font-size:11px; color:${TEXT2}; }
          .mobile-value { font-size:13px; color:${TEXT}; font-weight:500; }
          table { border-collapse:collapse; }
          @media (max-width:768px) { .hide-mobile { display:none !important; } }
        `}</style>

        {!currentUser ? <Login/> : (
          <div style={{ display:"flex", minHeight:"100vh", flexDirection:isMobile?"column":"row" }}>

            {/* DESKTOP Sidebar */}
            {!isMobile && <div style={{ width:232, background:SURF, borderRight:`1px solid ${BDR}`, display:"flex", flexDirection:"column", flexShrink:0, position:"sticky", top:0, height:"100vh", overflowY:"auto" }}>
              {/* Logo area */}
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", borderBottom:`1px solid ${BDR}` }}>
                <div style={{ width:36, height:36, flexShrink:0 }}>
                  <img src="/knives-logo.png" alt="CC" style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
                </div>
                <div style={{ lineHeight:1.2, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:TEXT }}>ChefCost</div>
                  <div style={{ fontSize:10, color:TEXT2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Patty Hustle</div>
                </div>
              </div>
              {/* Nav items */}
              <div style={{ padding:"6px 0", flex:1 }}>
                {visibleNav.map(item => {
                  const active = page===item.id;
                  return (
                    <div key={item.id}
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 16px", fontSize:13, color:active?TEXT:TEXT2, cursor:"pointer", borderLeft:`3px solid ${active?ACCENT:"transparent"}`, background:active?"#F3F3F3":"transparent", position:"relative", transition:"background 0.1s" }}
                      onClick={() => setPage(item.id)}>
                      <i className={`ti ${item.icon}`} style={{ fontSize:16, color:active?ACCENT:TEXT2 }}/>
                      {lang==="es" ? item.es : item.en}
                      {item.id==="shopping"&&pendingShopping>0&&<span style={{marginLeft:"auto",background:ACCENT,color:"#fff",fontSize:9,fontWeight:700,borderRadius:99,minWidth:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{pendingShopping}</span>}
                    </div>
                  );
                })}
              </div>
              {/* User footer */}
              <div style={{ padding:"10px 14px", borderTop:`1px solid ${BDR}`, display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>setPage("settings")}>
                <div style={g.avt(ROLE_COLORS[currentUser.role]||TEXT2)}>{currentUser.avatar}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:TEXT }}>{currentUser.name}</div>
                  <span style={{ fontSize:10, background:`${ROLE_COLORS[currentUser.role]}15`, color:ROLE_COLORS[currentUser.role], padding:"1px 6px", borderRadius:4, fontWeight:600 }}>{currentUser.role}</span>
                </div>
              </div>
            </div>}

            {/* Main content */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, paddingBottom:isMobile?70:0 }}>
              {/* Header */}
              <div style={{ padding:isMobile?"10px 16px":"11px 22px", borderBottom:`1px solid ${BDR}`, display:"flex", alignItems:"center", gap:12, background:SURF, position:"sticky", top:0, zIndex:10 }}>
                {isMobile&&(
                  <div style={{ width:30, height:30, flexShrink:0 }}>
                    <img src="/knives-logo.png" alt="CC" style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
                  </div>
                )}
                <span style={{ fontSize:isMobile?14:15, fontWeight:600, color:TEXT, flex:1 }}>
                  {page==="settings" ? (lang==="es"?"Configuración":"Settings") : visibleNav.find(n=>n.id===page)?.[lang==="es"?"es":"en"] || ""}
                </span>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {page!=="settings" && !canEdit(page) && canAccess(page) && (
                    <span style={{ fontSize:10, color:"#378ADD", background:"rgba(55,138,221,0.08)", padding:"3px 8px", borderRadius:4, fontWeight:600 }}>
                      <i className="ti ti-eye" style={{ marginRight:4 }}/>Solo lectura
                    </span>
                  )}
                  {!isMobile&&<span style={{ fontSize:11, color:TEXT2 }}>
                    <i className="ti ti-calendar" style={{ fontSize:12, verticalAlign:-1, marginRight:4 }}/>{new Date().toLocaleDateString(lang==="es"?"es-ES":"en-US",{month:"long",year:"numeric"})}
                  </span>}
                  {isMobile&&<div style={{ width:32, height:32, borderRadius:"50%", background:`${ROLE_COLORS[currentUser.role]}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:ROLE_COLORS[currentUser.role], cursor:"pointer", border:`1px solid ${ROLE_COLORS[currentUser.role]}30` }} onClick={()=>setPage("settings")}>{currentUser.avatar}</div>}
                </div>
              </div>

              {/* Page content */}
              <div style={{ flex:1, overflowY:"auto" }}>
                {canAccess(page)||page==="settings"
                  ? PAGES[page]||null
                  : <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14, color:TEXT2, padding:60 }}>
                      <i className="ti ti-lock" style={{ fontSize:48, color:"#E24B4A" }}/>
                      <div style={{ fontSize:14, fontWeight:600, color:TEXT }}>Acceso restringido</div>
                      <div style={{ fontSize:12 }}>No tienes permiso para ver este módulo.</div>
                    </div>
                }
              </div>
            </div>

            {/* MOBILE Bottom Navigation */}
            {isMobile&&<MobileBottomNav page={page} setPage={setPage} lang={lang} pendingShopping={pendingShopping}/>}

          </div>
        )}
      </div>
      </ToastProvider>
    </AppCtx.Provider>
  );
}