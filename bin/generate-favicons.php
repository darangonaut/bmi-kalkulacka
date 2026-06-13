<?php

/**
 * Vygeneruje sadu PNG ikon pre BMI kalkulačku z gauge motívu (rovnaký ako na
 * markuska.cz rozcestníku): tmavé pozadie, biely polkruhový oblúk, zelená ručička.
 * Kreslí sa supersamplovane (1024px) a downsampluje pre hladké hrany.
 *
 * Spusti: php bin/generate-favicons.php   (z koreňa repa)
 * Závislosť: PHP GD. Žiadne externé nástroje.
 */

$root = dirname(__DIR__);

// Farby (Light Minimal house-style)
$INK = [0x17, 0x17, 0x17];
$PAPER = [0xfa, 0xfa, 0xfa];
$GREEN = [0x16, 0xa3, 0x4a];

$S = 1024; // master canvas
$master = imagecreatetruecolor($S, $S);
imagealphablending($master, true);

$ink = imagecolorallocate($master, ...$INK);
$paper = imagecolorallocate($master, ...$PAPER);
$green = imagecolorallocate($master, ...$GREEN);

// Pozadie (full-bleed kvôli maskable PWA ikonám)
imagefilledrectangle($master, 0, 0, $S, $S, $ink);

// Gauge geometria
$cx = $S / 2;
$cy = $S * 0.60;            // baseline oblúka
$rOuter = $S * 0.34;
$rInner = $S * 0.255;       // šírka pásu = rOuter - rInner

// Polkruhový pás (horná polovica): outer pie paper, inner pie ink → ostane band
imagefilledarc($master, (int) $cx, (int) $cy, (int) ($rOuter * 2), (int) ($rOuter * 2), 180, 360, $paper, IMG_ARC_PIE);
imagefilledarc($master, (int) $cx, (int) $cy, (int) ($rInner * 2), (int) ($rInner * 2), 180, 360, $ink, IMG_ARC_PIE);

// Ručička (zelená) — z hubu smerom hore-doprava (~305° GD)
$a = deg2rad(305);
$L = $rOuter * 0.80;
$ex = $cx + cos($a) * $L;
$ey = $cy + sin($a) * $L;
imagesetthickness($master, (int) ($S * 0.045));
imageline($master, (int) $cx, (int) $cy, (int) $ex, (int) $ey, $green);

// Hub
imagefilledellipse($master, (int) $cx, (int) $cy, (int) ($S * 0.075), (int) ($S * 0.075), $paper);

// Výstupné veľkosti
$targets = [
    'icon-512.png' => 512,
    'icon-192.png' => 192,
    'apple-touch-icon.png' => 180,
    'favicon-32.png' => 32,
    'favicon-16.png' => 16,
];

foreach ($targets as $file => $size) {
    $out = imagecreatetruecolor($size, $size);
    imagealphablending($out, false);
    imagesavealpha($out, true);
    imagecopyresampled($out, $master, 0, 0, 0, 0, $size, $size, $S, $S);
    imagepng($out, $root.'/'.$file);
    imagedestroy($out);
    echo "✓ $file ({$size}px)\n";
}

imagedestroy($master);
echo "Hotovo.\n";
