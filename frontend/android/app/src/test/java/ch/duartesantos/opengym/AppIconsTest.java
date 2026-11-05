package ch.duartesantos.opengym;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Test;

public class AppIconsTest {
    @Test
    public void everyIdHasItsAlias() {
        assertEquals(AppIcons.IDS.length, AppIcons.ALIASES.length);
        assertEquals("IconDefault", AppIcons.aliasFor("default"));
        assertNull(AppIcons.aliasFor("nope"));
        assertNull(AppIcons.aliasFor(null));
    }

    @Test
    public void untouchedAliasesMeanTheOriginal() {
        assertEquals("default", AppIcons.current(new boolean[AppIcons.ALIASES.length]));
    }

    @Test
    public void theAliasEnabledByHandIsTheIcon() {
        boolean[] on = new boolean[AppIcons.ALIASES.length];
        on[0] = true;
        assertEquals("default", AppIcons.current(on));
    }
}
